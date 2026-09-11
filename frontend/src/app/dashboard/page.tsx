'use client';
import { useAccount, useContractRead, useBalance } from 'wagmi';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { TrustWorkABI } from '@/lib/TrustWorkABI';
import { TRUSTWORK_ADDRESS, USDC_ADDRESS } from '@/lib/config';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { address } = useAccount();
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [draftMilestones, setDraftMilestones] = useState<any>(null);
  
  const { data: projectCount } = useContractRead({
    address: TRUSTWORK_ADDRESS,
    abi: TrustWorkABI,
    functionName: 'projectCount',
    watch: true,
  });

  const { data: project } = useContractRead({
    address: TRUSTWORK_ADDRESS,
    abi: TrustWorkABI,
    functionName: 'projects',
    args: [0n],
    enabled: Number(projectCount) > 0,
    watch: true,
  });

  const { data: usdcBalance } = useBalance({
    address: address,
    token: USDC_ADDRESS,
    watch: true,
  });

  useEffect(() => {
    // Ambil data deskripsi milestone dari localStorage (Hybrid off-chain data approach for hackathon)
    const saved = localStorage.getItem('trustwork_draft_0');
    if (saved) {
      try {
        setDraftMilestones(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleApproveMilestone = async () => {
    try {
      setLoadingApprove(true);
      const { request } = await prepareWriteContract({
        address: TRUSTWORK_ADDRESS,
        abi: TrustWorkABI,
        functionName: 'approveMilestone',
        args: [0n],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });
      alert("Milestone berhasil dicairkan ke Pekerja!");
    } catch (e: any) {
      alert("Gagal: " + e.message);
    } finally {
      setLoadingApprove(false);
    }
  };

  const isClient = project && address && (project as any)[0] === address;
  const isWorker = project && address && (project as any)[1] === address;
  
  const currentMilestoneIndex = project ? Number((project as any)[5]) : 0;
  
  // Hitung jumlah milestone (Jika ada di local storage pakai itu, jika tidak asumsi 2)
  const totalMilestones = draftMilestones?.milestones?.length || 2;
  const currentTaskDesc = draftMilestones?.milestones?.[currentMilestoneIndex]?.description || `Task #${currentMilestoneIndex + 1}`;
  const currentTaskPct = draftMilestones?.milestones?.[currentMilestoneIndex]?.percentage || '?';

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative pointer-events-auto">
      <div className="absolute top-0 right-0 w-[40%] h-[30%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <Link href="/" className="text-sm text-gray-500 hover:text-white mb-2 inline-block transition-colors">← Home</Link>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Dashboard
              {address && (
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-purple-300 font-mono">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              )}
            </h1>
          </div>
          <Link href="/create" className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 font-pj rounded-xl hover:scale-105 active:scale-95">
            + New Escrow
          </Link>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <p className="text-gray-400 text-sm font-medium mb-2">My Wallet Balance (mUSDC)</p>
            <p className="text-4xl font-light font-mono text-green-400">
              {usdcBalance ? Number(usdcBalance.formatted).toFixed(2) : '0.00'}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <p className="text-gray-400 text-sm font-medium mb-2">Network</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-2xl font-semibold text-white">Sepolia Testnet</p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <p className="text-gray-400 text-sm font-medium mb-2">Contract Address</p>
            <p className="text-sm font-mono text-gray-300 break-all">{TRUSTWORK_ADDRESS || 'Not Deployed'}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Your Active Projects</h2>
          
          {Number(projectCount) > 0 && project ? (
            <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-lg bg-gray-900/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Project #0</h2>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                  (project as any)[4] === 1 ? 'bg-blue-900/50 text-blue-300 border-blue-500/30' : 
                  (project as any)[4] === 3 ? 'bg-green-900/50 text-green-300 border-green-500/30' : 
                  'bg-gray-800 text-gray-400'
                }`}>
                  {(project as any)[4] === 1 ? 'FUNDED / ACTIVE' : (project as any)[4] === 3 ? 'COMPLETED' : 'UNKNOWN'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-mono text-gray-400 mb-8 p-6 bg-black/50 rounded-xl border border-white/5">
                <div>
                  <p className="mb-1 text-gray-500">Client (Pemberi Kerja):</p>
                  <p className="text-white truncate">{(project as any)[0]}</p>
                </div>
                <div>
                  <p className="mb-1 text-gray-500">Worker (Freelancer):</p>
                  <p className="text-purple-400 truncate">{(project as any)[1]}</p>
                </div>
                <div>
                  <p className="mb-1 text-gray-500">Total Locked Value:</p>
                  <p className="text-white text-lg font-bold">{(project as any)[2] ? Number((project as any)[2]) / 1e18 : 0} <span className="text-sm font-normal text-gray-500">mUSDC</span></p>
                </div>
                <div>
                  <p className="mb-1 text-gray-500">Milestone Progress:</p>
                  <p className="text-white text-lg font-bold">{currentMilestoneIndex} <span className="text-sm font-normal text-gray-500">/ {totalMilestones} Approved</span></p>
                </div>
              </div>
              
              {(project as any)[4] === 1 && (
                <div className="mb-8 p-6 bg-purple-900/10 border border-purple-500/30 rounded-xl">
                  <h3 className="text-purple-300 font-bold mb-2">Current Task in Progress:</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-white text-xl">"{currentTaskDesc}"</p>
                    <span className="bg-purple-600 text-white font-bold px-4 py-2 rounded-lg">Pay {currentTaskPct}%</span>
                  </div>
                </div>
              )}

              {isClient && (project as any)[4] === 1 && (
                <div className="flex flex-col items-end">
                  <button 
                    onClick={handleApproveMilestone} 
                    disabled={loadingApprove}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {loadingApprove ? "Memproses Pencairan..." : "Approve Milestone (Pay Worker)"}
                  </button>
                </div>
              )}

              {isWorker && (project as any)[4] === 1 && (
                <div className="p-5 bg-blue-900/20 border border-blue-500/30 rounded-xl text-blue-200 flex items-start gap-4">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <p className="font-bold mb-1">Menunggu Persetujuan Klien</p>
                    <p className="text-sm opacity-80">Selesaikan tugas <b>"{currentTaskDesc}"</b> dan tunggu Klien menekan tombol Approve. Jika disetujui, mUSDC akan otomatis masuk ke dompet Anda.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 border border-white/5 border-dashed flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-medium text-white mb-2">No active escrows</h3>
              <p className="text-gray-400 max-w-md mx-auto">Deploy a new contract to get started safely.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
