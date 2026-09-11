'use client';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { TrustWorkABI } from '@/lib/TrustWorkABI';
import { MockUSDCABI } from '@/lib/MockUSDCABI';
import { TRUSTWORK_ADDRESS, USDC_ADDRESS } from '@/lib/config';
import { parseUnits } from 'viem';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CreateProject() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [worker, setWorker] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleCreate = async () => {
    if (!worker || !amount) return alert('Isi data dengan lengkap');
    try {
      setIsDeploying(true);
      const amountWei = parseUnits(amount, 18);

      // 1. Approve USDC Token
      setStatus('Minta Izin (Approve)...');
      const { request: approveReq } = await prepareWriteContract({
        address: USDC_ADDRESS,
        abi: MockUSDCABI,
        functionName: 'approve',
        args: [TRUSTWORK_ADDRESS, amountWei],
      });
      const { hash: approveHash } = await writeContract(approveReq);
      await waitForTransaction({ hash: approveHash });

      // 2. Create Escrow Project
      setStatus('Mengunci Dana...');
      const { request: createReq } = await prepareWriteContract({
        address: TRUSTWORK_ADDRESS,
        abi: TrustWorkABI,
        functionName: 'createProject',
        args: [worker as `0x${string}`, amountWei, USDC_ADDRESS, [50, 50]],
      });
      const { hash: createHash } = await writeContract(createReq);
      await waitForTransaction({ hash: createHash });

      setStatus('Sukses Dibuat.');
      alert('Proyek berhasil dibuat! Cek Dashboard.');
      window.location.href = '/dashboard';
    } catch (e: any) {
      console.error(e);
      alert('Gagal: ' + e.message);
      setStatus('');
    } finally {
      setIsDeploying(false);
    }
  };

  // Jangan render apapun sebelum client-side mounting selesai
  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-white">← Back to Dashboard</Link>
        <ConnectButton />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">Secure a Gig</h1>
          <p className="text-gray-400 mb-8">Lock funds in smart contract. Released only when milestones are approved.</p>
        </div>
        
        <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Worker Address</label>
              <input 
                className="w-full bg-black border border-gray-700 p-3 rounded-xl text-white font-mono" 
                placeholder="0x..." 
                value={worker}
                onChange={e => setWorker(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Total Amount (mUSDC)</label>
              <input 
                className="w-full bg-black border border-gray-700 p-3 rounded-xl text-white font-mono" 
                placeholder="100" 
                type="number" 
                value={amount}
                onChange={e => setAmount(e.target.value)} 
              />
            </div>
            
            {!address ? (
              <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-center text-sm">
                Harap hubungkan dompet (Connect Wallet) di sudut kanan atas terlebih dahulu.
              </div>
            ) : (
              <button 
                onClick={handleCreate} 
                disabled={isDeploying || !worker || !amount} 
                className={`w-full px-4 py-4 rounded-xl font-bold transition-all ${isDeploying || !worker || !amount ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 cursor-pointer'}`}
              >
                {isDeploying ? status : 'Lock Funds & Create'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
