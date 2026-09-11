'use client';
import { useAccount, useContractRead, useBalance } from 'wagmi';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { TrustWorkABI } from '@/lib/TrustWorkABI';
import { TRUSTWORK_ADDRESS, USDC_ADDRESS } from '@/lib/config';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { address, isConnecting } = useAccount();
  const [loadingApprove, setLoadingApprove] = useState<number | null>(null);
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [initText, setInitText] = useState('Syncing with Blockchain...');
  
  const { data: projectCountRaw } = useContractRead({
    address: TRUSTWORK_ADDRESS,
    abi: TrustWorkABI,
    functionName: 'projectCount',
    watch: true,
  });

  const projectCount = projectCountRaw ? Number(projectCountRaw) : 0;

  const { data: usdcBalance } = useBalance({
    address: address,
    token: USDC_ADDRESS,
    watch: true,
  });

  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [projectsData, setProjectsData] = useState<any[]>([]);

  useEffect(() => {
    if (projectCount === 0) return;
    
    const fetchAllProjects = async () => {
      const { createPublicClient, http } = await import('viem');
      const { sepolia } = await import('viem/chains');
      
      const client = createPublicClient({
        chain: sepolia,
        transport: http('https://ethereum-sepolia-rpc.publicnode.com')
      });

      const fetchedProjects = [];
      // Mengubah urutan array menjadi Ascending (0, 1, 2, 3...)
      for (let i = 0; i < projectCount; i++) {
        try {
          const data = await client.readContract({
            address: TRUSTWORK_ADDRESS,
            abi: TrustWorkABI,
            functionName: 'projects',
            args: [BigInt(i)]
          });
          fetchedProjects.push({ id: i, data });
        } catch (e) {
          console.error(e);
        }
      }
      setProjectsData(fetchedProjects);
      
      // Buka accordion secara otomatis untuk proyek terbaru (ID tertinggi)
      if (fetchedProjects.length > 0) {
        setActiveProjectId(projectCount - 1);
      }
    };

    fetchAllProjects();
  }, [projectCount]);

  useEffect(() => {
    if (isConnecting) {
      setInitText('Connecting to Wallet...');
      return;
    }
    setInitText('Loading Smart Contract State...');
    const timer = setTimeout(() => {
      setInitText('Decrypting Escrow Data...');
      const timer2 = setTimeout(() => {
        setIsInitializing(false);
      }, 800);
      return () => clearTimeout(timer2);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isConnecting, address]);

  const handleApproveMilestone = async (projectId: number) => {
    try {
      setLoadingApprove(projectId);
      const approveLoading = toast.loading('Memproses pencairan dana...');
      
      const { request } = await prepareWriteContract({
        address: TRUSTWORK_ADDRESS,
        abi: TrustWorkABI,
        functionName: 'approveMilestone',
        args: [BigInt(projectId)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });
      
      toast.dismiss(approveLoading);
      toast.success(
        <div>
          Dana berhasil dicairkan!<br/>
          <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer" className="text-purple-400 underline text-xs mt-1 block">
            Lihat di Explorer ↗
          </a>
        </div>,
        { duration: 6000 }
      );
      
      setTimeout(() => window.location.reload(), 2000);

    } catch (e: any) {
      toast.dismiss();
      toast.error('Gagal: ' + (e.shortMessage || e.message));
    } finally {
      setLoadingApprove(null);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h2 className="text-xl font-mono text-purple-400 font-bold tracking-widest mb-2">TRUSTWORK SYSTEM</h2>
          <p className="text-gray-500 text-sm animate-pulse">{initText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative pointer-events-auto selection:bg-purple-900 animate-in fade-in duration-700">
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
          <Link href="/create" className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 font-pj rounded-xl hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20">
            + New Escrow
          </Link>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
            <p className="text-gray-400 text-sm font-medium mb-2 group-hover:text-gray-300 transition-colors">My Wallet Balance (mUSDC)</p>
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
            <a href={`https://sepolia.etherscan.io/address/${TRUSTWORK_ADDRESS}`} target="_blank" rel="noreferrer" className="text-sm font-mono text-purple-400 hover:text-purple-300 underline break-all">{TRUSTWORK_ADDRESS || 'Not Deployed'}</a>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Your Active Projects</h2>
            <span className="text-sm text-gray-500">Total: {projectCount} Escrows</span>
          </div>
          
          {projectCount > 0 && projectsData.length > 0 ? (
            <div className="space-y-4">
              {projectsData.map((item) => {
                const pId = item.id;
                const pData = item.data;
                const isClient = address && pData[0] === address;
                const isWorker = address && pData[1] === address;
                const isCompleted = pData[4] === 3;
                const currentMilestoneIndex = Number(pData[5]);
                
                // Ambil Nama Proyek & Deskripsi Milestone dari LocalStorage berdasarkan ID
                const saved = typeof window !== 'undefined' ? localStorage.getItem(`trustwork_draft_${pId}`) : null;
                const draft = saved ? JSON.parse(saved) : null;
                
                // Terapkan data off-chain / fallback on-chain
                const projectName = draft?.name || `Escrow Contract #${pId}`;
                const totalMilestones = draft?.milestones?.length || 2;
                const currentTaskDesc = draft?.milestones?.[currentMilestoneIndex]?.description || `Task #${currentMilestoneIndex + 1}`;
                const currentTaskPct = draft?.milestones?.[currentMilestoneIndex]?.percentage || '?';

                return (
                  <div key={pId} className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                    activeProjectId === pId 
                    ? (isCompleted ? 'bg-green-900/10 border-green-500/30 shadow-lg shadow-green-900/20' : 'bg-gray-900/80 border-purple-500/30 shadow-lg shadow-purple-900/20')
                    : 'bg-black/40 border-white/5 hover:border-white/20'
                  }`}>
                    
                    <div 
                      className="p-6 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                      onClick={() => setActiveProjectId(activeProjectId === pId ? null : pId)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                          #{pId}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{projectName}</h3>
                          <p className="text-sm text-gray-500 font-mono mt-1">Client: {pData[0].slice(0,6)}...{pData[0].slice(-4)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm text-gray-500 mb-1">Locked Value</p>
                          <p className="font-mono font-bold text-white">{pData[2] ? Number(pData[2]) / 1e18 : 0} USDC</p>
                        </div>
                        
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                          pData[4] === 1 ? 'bg-blue-900/50 text-blue-300 border-blue-500/30' : 
                          isCompleted ? 'bg-green-900/50 text-green-300 border-green-500/50' : 
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {pData[4] === 1 ? 'ACTIVE' : isCompleted ? 'COMPLETED' : 'UNKNOWN'}
                        </span>

                        <svg className={`w-5 h-5 text-gray-400 transition-transform ${activeProjectId === pId ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {activeProjectId === pId && (
                      <div className="border-t border-white/5 p-6 bg-black/20">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          
                          <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm font-mono text-gray-400 p-4 bg-black/40 rounded-xl border border-white/5">
                              <div>
                                <p className="mb-1 text-gray-500">Client Address:</p>
                                <p className="text-white truncate">{pData[0]}</p>
                              </div>
                              <div>
                                <p className="mb-1 text-gray-500">Worker Address:</p>
                                <p className="text-purple-400 truncate">{pData[1]}</p>
                              </div>
                            </div>

                            {pData[4] === 1 && (
                              <div className="p-6 bg-purple-900/10 border border-purple-500/30 rounded-xl relative overflow-hidden">
                                <div className="absolute left-0 top-0 w-1 h-full bg-purple-500"></div>
                                <h3 className="text-purple-300 font-bold mb-2">Current Task in Progress:</h3>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                  <p className="text-white text-lg">"{currentTaskDesc}"</p>
                                  <span className="bg-purple-600 text-white font-bold px-4 py-2 rounded-lg text-sm whitespace-nowrap">Pay {currentTaskPct}%</span>
                                </div>
                              </div>
                            )}
                            
                            {isCompleted && (
                              <div className="p-6 bg-green-900/20 border border-green-500/50 rounded-xl flex items-center gap-4">
                                <div className="text-4xl">🎉</div>
                                <div>
                                  <h3 className="text-lg font-bold text-green-400">Proyek Selesai</h3>
                                  <p className="text-green-200/80 text-sm mt-1">100% dana telah berhasil dicairkan ke dompet Pekerja.</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="mb-6">
                              <p className="text-gray-500 text-sm mb-2">Milestone Progress</p>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                                  <div className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-purple-500'} transition-all`} style={{ width: `${(currentMilestoneIndex / totalMilestones) * 100}%` }}></div>
                                </div>
                                <span className="text-sm font-mono text-white whitespace-nowrap">
                                  {isCompleted ? totalMilestones : currentMilestoneIndex} / {totalMilestones}
                                </span>
                              </div>
                            </div>

                            {isClient && pData[4] === 1 && (
                              <button 
                                onClick={() => handleApproveMilestone(pId)} 
                                disabled={loadingApprove === pId}
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 text-sm flex justify-center items-center gap-2"
                              >
                                {loadingApprove === pId ? (
                                  <><span className="animate-spin text-xl">↻</span> Memproses...</>
                                ) : "✓ Approve & Pay Worker"}
                              </button>
                            )}

                            {isWorker && pData[4] === 1 && (
                              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl text-blue-200 flex flex-col gap-2">
                                <p className="font-bold text-sm flex items-center gap-2"><span className="animate-pulse">⏳</span> Menunggu Klien</p>
                                <p className="text-xs opacity-80 leading-relaxed">Dana otomatis masuk ke dompet Anda saat klien menekan Approve.</p>
                              </div>
                            )}

                            {!isClient && !isWorker && (
                              <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-400 text-xs">
                                Anda bukan partisipan dalam Escrow ini.
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
