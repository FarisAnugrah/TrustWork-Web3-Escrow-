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

  const { write } = useContractWrite({
    address: TRUSTWORK_ADDRESS,
    abi: TrustWorkABI,
    functionName: 'createProject',
  });

  const handleCreate = async () => {
    if (!worker || !amount || !write) return alert('Isi data dengan lengkap');
    write({ args: [worker as `0x${string}`, parseUnits(amount, 18), USDC_ADDRESS, [50, 50]] });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-md mx-auto mt-12">
        <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">
          ← Back to Dashboard
        </Link>
        
        <div className="glass-card rounded-2xl p-8 border border-gray-800">
          <h1 className="text-2xl font-bold mb-8 text-white tracking-tight">Deploy Escrow Contract</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Worker Wallet Address</label>
              <input 
                className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none font-mono text-sm transition-all" 
                placeholder="0x..." 
                onChange={e => setWorker(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Total Funding (Mock USDC)</label>
              <div className="relative">
                <input 
                  className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none font-mono text-sm transition-all" 
                  placeholder="100.00" 
                  type="number" 
                  onChange={e => setAmount(e.target.value)} 
                />
                <span className="absolute right-4 top-3.5 text-gray-500 text-sm font-medium">USDC</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Milestones: 50% Upfront, 50% Delivery.</p>
            </div>

            <button 
              onClick={handleCreate} 
              disabled={!address}
              className="w-full bg-white text-black disabled:bg-gray-800 disabled:text-gray-500 px-4 py-3.5 rounded-lg font-bold hover:bg-gray-200 transition-colors mt-4"
            >
              {address ? 'Sign & Deploy' : 'Connect Wallet to Deploy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
