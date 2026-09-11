'use client';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { TrustWorkABI } from '@/lib/TrustWorkABI';
import { MockUSDCABI } from '@/lib/MockUSDCABI';
import { TRUSTWORK_ADDRESS, USDC_ADDRESS } from '@/lib/config';
import { parseUnits } from 'viem';
import Link from 'next/link';

export default function CreateProject() {
  const { address } = useAccount();
  const [worker, setWorker] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleCreate = async () => {
    if (!worker || !amount) return alert('Isi data dengan lengkap');
    try {
      setIsDeploying(true);
      const amountWei = parseUnits(amount, 18);

      // 1. Approve USDC Token
      setStatus('Minta Izin Akses Token (Approve)...');
      const { request: approveReq } = await prepareWriteContract({
        address: USDC_ADDRESS,
        abi: MockUSDCABI,
        functionName: 'approve',
        args: [TRUSTWORK_ADDRESS, amountWei],
      });
      const { hash: approveHash } = await writeContract(approveReq);
      await waitForTransaction({ hash: approveHash });

      // 2. Create Escrow Project
      setStatus('Mengunci Dana ke Smart Contract...');
      const { request: createReq } = await prepareWriteContract({
        address: TRUSTWORK_ADDRESS,
        abi: TrustWorkABI,
        functionName: 'createProject',
        args: [worker as `0x${string}`, amountWei, USDC_ADDRESS, [50, 50]],
      });
      const { hash: createHash } = await writeContract(createReq);
      await waitForTransaction({ hash: createHash });

      setStatus('Sukses! Escrow Berhasil Dibuat.');
      alert('Proyek berhasil dibuat! Cek Dashboard.');
    } catch (e: any) {
      console.error(e);
      alert('Gagal: ' + e.message);
      setStatus('');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white mb-8 inline-block">← Back</Link>
          <h1 className="text-4xl font-extrabold mb-4">Secure a Gig</h1>
          <p className="text-gray-400 mb-8">Lock funds in smart contract. Released only when milestones are approved.</p>
        </div>
        
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl relative">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Worker Address</label>
              <input className="w-full bg-black/50 border border-gray-700 p-3 rounded-xl text-white font-mono" placeholder="0x..." onChange={e => setWorker(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Total Amount (mUSDC)</label>
              <input className="w-full bg-black/50 border border-gray-700 p-3 rounded-xl text-white font-mono" placeholder="100" type="number" onChange={e => setAmount(e.target.value)} />
            </div>
            <button onClick={handleCreate} disabled={!address || isDeploying} className="w-full bg-white text-black px-4 py-4 rounded-xl font-bold transition-all disabled:opacity-50">
              {isDeploying ? status : (address ? 'Lock Funds' : 'Connect Wallet')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
