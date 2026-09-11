'use client';
import { useState } from 'react';
import { useContractWrite, useAccount } from 'wagmi';
import { TrustWorkABI } from '@/lib/TrustWorkABI';
import { MockUSDCABI } from '@/lib/MockUSDCABI';
import { TRUSTWORK_ADDRESS, USDC_ADDRESS } from '@/lib/config';
import { parseUnits } from 'viem';

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
    
    write({
      args: [worker as `0x${string}`, parseUnits(amount, 18), USDC_ADDRESS, [50, 50]],
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl border">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Buat Proyek Baru</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Address Pekerja (Worker)</label>
        <input 
          className="border border-gray-300 p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 text-black" 
          placeholder="0x..." 
          onChange={e => setWorker(e.target.value)} 
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Dana (USDC)</label>
        <input 
          className="border border-gray-300 p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 text-black" 
          placeholder="100" 
          type="number" 
          onChange={e => setAmount(e.target.value)} 
        />
        <p className="text-xs text-gray-500 mt-1">Milestone di-set otomatis 50% DP, 50% Final.</p>
      </div>

      <button 
        onClick={handleCreate} 
        disabled={!address}
        className="bg-blue-600 disabled:bg-gray-400 text-white px-4 py-3 w-full rounded-lg font-bold hover:bg-blue-700 transition-colors"
      >
        {address ? 'Lock Dana & Buat Proyek' : 'Connect Wallet Dulu'}
      </button>
    </div>
  );
}
