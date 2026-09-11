'use client';
import { useState } from 'react';
import { useContractWrite, useAccount } from 'wagmi';
import { TrustWorkABI } from '@/lib/TrustWorkABI';
import { MockUSDCABI } from '@/lib/MockUSDCABI';
import { TRUSTWORK_ADDRESS, USDC_ADDRESS } from '@/lib/config';
import { parseUnits } from 'viem';
import Link from 'next/link';

export default function CreateProject() {
  const { address } = useAccount();
  const [worker, setWorker] = useState('');
  const [amount, setAmount] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const { writeAsync } = useContractWrite({
    address: TRUSTWORK_ADDRESS,
    abi: TrustWorkABI,
    functionName: 'createProject',
  });

  const handleCreate = async () => {
    if (!worker || !amount || !writeAsync) return alert('Isi data dengan lengkap');
    try {
      setIsDeploying(true);
      await writeAsync({ args: [worker as `0x${string}`, parseUnits(amount, 18), USDC_ADDRESS, [50, 50]] });
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative selection:bg-purple-900 selection:text-white">
      {/* Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8">
        
        {/* Left Side: Context */}
        <div>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white mb-8 inline-block transition-colors">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Secure a Gig
          </h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            Lock your funds into a decentralized smart contract. The funds will only be released when predefined milestones are met and approved by you.
          </p>

          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Milestone Breakdown (Auto-set)</h3>
            <div className="relative pl-6 border-l-2 border-purple-500/50 space-y-6">
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-purple-500 border-4 border-black"></span>
                <p className="text-white font-medium">Milestone 1: Down Payment <span className="text-purple-400 ml-2">50%</span></p>
                <p className="text-sm text-gray-500 mt-1">Released upon project kick-off / first approval.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-purple-500/50 border-4 border-black"></span>
                <p className="text-white font-medium">Milestone 2: Final Delivery <span className="text-purple-400 ml-2">50%</span></p>
                <p className="text-sm text-gray-500 mt-1">Released when the final work is submitted and approved.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side: Form */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          
          <div className="space-y-6 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Worker Wallet Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <input 
                  className="w-full bg-black/50 border border-gray-700 text-white py-3 pl-10 pr-4 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none font-mono text-sm transition-all placeholder:text-gray-600" 
                  placeholder="0x..." 
                  onChange={e => setWorker(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Total Funding Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold">$</span>
                </div>
                <input 
                  className="w-full bg-black/50 border border-gray-700 text-white py-3 pl-8 pr-16 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-lg transition-all placeholder:text-gray-600" 
                  placeholder="0.00" 
                  type="number" 
                  onChange={e => setAmount(e.target.value)} 
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-purple-400 font-semibold text-sm">mUSDC</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleCreate} 
                disabled={!address || isDeploying}
                className="w-full relative group overflow-hidden bg-white text-black disabled:bg-gray-800 disabled:text-gray-500 px-4 py-4 rounded-xl font-bold transition-all disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isDeploying ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Awaiting Signature...
                    </>
                  ) : address ? 'Lock Funds & Create Escrow' : 'Connect Wallet First'}
                </span>
                {address && !isDeploying && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}
              </button>
              <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Secured by TrustWork Smart Contract
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
