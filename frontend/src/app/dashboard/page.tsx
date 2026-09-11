'use client';
import { useAccount, useContractRead } from 'wagmi';
import { TrustWorkABI } from '@/lib/TrustWorkABI';
import { TRUSTWORK_ADDRESS } from '@/lib/config';
import Link from 'next/link';

export default function Dashboard() {
  const { address } = useAccount();
  
  const { data: projectCount } = useContractRead({
    address: TRUSTWORK_ADDRESS,
    abi: TrustWorkABI,
    functionName: 'projectCount',
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative selection:bg-purple-900 selection:text-white">
      {/* Ambient Background */}
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
          <Link href="/create" className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:scale-105 active:scale-95">
            + New Escrow
          </Link>
        </header>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors"></div>
            <p className="text-gray-400 text-sm font-medium mb-2">Total Global Escrows</p>
            <p className="text-5xl font-light font-mono text-white">{projectCount !== undefined ? Number(projectCount) : '0'}</p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
            <p className="text-gray-400 text-sm font-medium mb-2">Network</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-2xl font-semibold text-white">Polygon Amoy</p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors">
            <p className="text-gray-400 text-sm font-medium mb-2">Contract Address</p>
            <p className="text-sm font-mono text-gray-300 break-all">{TRUSTWORK_ADDRESS || 'Not Deployed'}</p>
          </div>
        </div>

        {/* Projects Area (Empty State for MVP) */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Your Active Projects</h2>
          <div className="glass-card rounded-2xl p-12 border border-white/5 border-dashed flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No active escrows found</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              You haven't created or participated in any escrow projects yet. Deploy a new contract to get started safely.
            </p>
            <Link href="/create" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10">
              Create First Project
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
