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
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
          <Link href="/" className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            TrustWork Dashboard
          </Link>
          <Link href="/create" className="bg-white hover:bg-gray-200 text-black px-5 py-2.5 rounded-lg font-semibold transition-colors text-sm">
            Deploy New Project
          </Link>
        </div>
        
        <div className="glass-card rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <h2 className="text-xl font-semibold text-white">Smart Contract Status</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-1">Total Projects</p>
              <p className="text-4xl font-mono text-white">{projectCount !== undefined ? Number(projectCount) : '0'}</p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-1">Network</p>
              <p className="text-lg font-mono text-white">Polygon Amoy</p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-1">Contract Address</p>
              <p className="text-sm font-mono text-purple-400 truncate">{TRUSTWORK_ADDRESS || 'Not Deployed'}</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <p className="text-purple-200 text-sm">
              ℹ️ Connect your wallet and ensure you are on the correct testnet. Project lists will populate automatically once the contract is actively generating events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
