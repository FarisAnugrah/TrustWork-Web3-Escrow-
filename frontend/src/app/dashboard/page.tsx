'use client';
import { useAccount, useContractRead } from 'wagmi';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { TrustWorkABI } from '@/lib/TrustWorkABI';
import { TRUSTWORK_ADDRESS } from '@/lib/config';
import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  const { address } = useAccount();
  const [loadingApprove, setLoadingApprove] = useState(false);
  
  const { data: projectCount } = useContractRead({
    address: TRUSTWORK_ADDRESS,
    abi: TrustWorkABI,
    functionName: 'projectCount',
    watch: true,
  });

  // Ambil data proyek ID 0 (MVP Hackathon ambil 1 proyek saja untuk demo)
  const { data: project } = useContractRead({
    address: TRUSTWORK_ADDRESS,
    abi: TrustWorkABI,
    functionName: 'projects',
    args: [0n],
    enabled: Number(projectCount) > 0,
    watch: true,
  });

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

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
          <Link href="/" className="text-3xl font-bold">Dashboard</Link>
          <Link href="/create" className="bg-white text-black px-6 py-3 font-bold rounded-xl">+ New Escrow</Link>
        </header>

        {Number(projectCount) > 0 && project ? (
          <div className="glass-card p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex justify-between">
              Project #0
              <span className="text-sm bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                {(project as any)[4] === 1 ? 'FUNDED' : (project as any)[4] === 3 ? 'COMPLETED' : 'UNKNOWN'}
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm font-mono text-gray-400 mb-6">
              <p>Client: <span className="text-white">{(project as any)[0]}</span></p>
              <p>Worker: <span className="text-white">{(project as any)[1]}</span></p>
              <p>Current Milestone: <span className="text-white">{(project as any)[5]} / 2</span></p>
            </div>
            
            {isClient && (project as any)[4] === 1 && (
              <button 
                onClick={handleApproveMilestone} 
                disabled={loadingApprove}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full md:w-auto"
              >
                {loadingApprove ? "Memproses..." : "Approve Next Milestone (Pay Worker)"}
              </button>
            )}

            {isWorker && (project as any)[4] === 1 && (
              <div className="p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg text-purple-200">
                Anda adalah Pekerja di proyek ini. Kerjakan tugas Anda dan tunggu Klien menekan Approve agar dana cair ke dompet Anda!
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-12 glass-card rounded-2xl border border-white/10">
            <h3 className="text-lg">No active escrows</h3>
          </div>
        )}
      </div>
    </div>
  );
}
