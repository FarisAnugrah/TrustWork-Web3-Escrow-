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
  const [milestones, setMilestones] = useState<number[]>([50, 50]); // Default dynamic state
  const [status, setStatus] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => setMounted(true), []);

  const totalPercentage = milestones.reduce((a, b) => a + b, 0);
  const isValidPercentage = totalPercentage === 100;

  const handleAddMilestone = () => {
    if (milestones.length < 5) {
      setMilestones([...milestones, 0]);
    }
  };

  const handleRemoveMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const handleMilestoneChange = (index: number, value: string) => {
    const numValue = parseInt(value) || 0;
    const newMilestones = [...milestones];
    newMilestones[index] = numValue;
    setMilestones(newMilestones);
  };

  const handleCreate = async () => {
    if (!worker || !amount) return alert('Isi data worker dan amount dengan lengkap');
    if (!isValidPercentage) return alert('Total persentase milestone harus tepat 100%');
    
    try {
      setIsDeploying(true);
      const amountWei = parseUnits(amount, 18);

      setStatus('Minta Izin (Approve)...');
      const { request: approveReq } = await prepareWriteContract({
        address: USDC_ADDRESS,
        abi: MockUSDCABI,
        functionName: 'approve',
        args: [TRUSTWORK_ADDRESS, amountWei],
      });
      const { hash: approveHash } = await writeContract(approveReq);
      await waitForTransaction({ hash: approveHash });

      setStatus('Mengunci Dana...');
      const { request: createReq } = await prepareWriteContract({
        address: TRUSTWORK_ADDRESS,
        abi: TrustWorkABI,
        functionName: 'createProject',
        args: [worker as `0x${string}`, amountWei, USDC_ADDRESS, milestones],
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

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-white">← Back to Dashboard</Link>
        <ConnectButton />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-extrabold mb-4">Secure a Gig</h1>
          <p className="text-gray-400 mb-8">Lock funds in smart contract. Released only when milestones are approved.</p>
          
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Dynamic Milestones</h3>
            <p className="text-sm text-gray-500 mb-6">
              You can set custom payout stages. The Smart Contract will hold the funds and pay the exact percentage you set for each milestone step.
            </p>
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/50 border border-gray-800">
              <span className="text-gray-400">Total Percentage:</span>
              <span className={`text-xl font-bold ${isValidPercentage ? 'text-green-400' : 'text-red-400'}`}>
                {totalPercentage}%
              </span>
            </div>
            {!isValidPercentage && (
              <p className="text-red-400 text-xs mt-2">Must equal exactly 100% to deploy contract.</p>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-3 bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Worker Address</label>
                <input 
                  className="w-full bg-black border border-gray-700 p-3 rounded-xl text-white font-mono text-sm" 
                  placeholder="0x..." 
                  value={worker}
                  onChange={e => setWorker(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Total Amount (mUSDC)</label>
                <input 
                  className="w-full bg-black border border-gray-700 p-3 rounded-xl text-white font-mono text-sm" 
                  placeholder="100" 
                  type="number" 
                  value={amount}
                  onChange={e => setAmount(e.target.value)} 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm text-gray-300">Milestone Payouts (%)</label>
                <button onClick={handleAddMilestone} disabled={milestones.length >= 5} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded">
                  + Add Stage
                </button>
              </div>
              
              <div className="space-y-3">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-gray-500 font-mono text-xs w-8">#{i+1}</span>
                    <input 
                      type="number" 
                      className="w-full bg-black border border-gray-700 p-3 rounded-xl text-white font-mono" 
                      value={m}
                      onChange={(e) => handleMilestoneChange(i, e.target.value)}
                    />
                    <span className="text-gray-500">%</span>
                    <button 
                      onClick={() => handleRemoveMilestone(i)}
                      disabled={milestones.length <= 1}
                      className="text-gray-600 hover:text-red-400 p-2 disabled:opacity-0"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-6">
              {!address ? (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-center text-sm">
                  Harap hubungkan dompet (Connect Wallet) terlebih dahulu.
                </div>
              ) : (
                <button 
                  onClick={handleCreate} 
                  disabled={isDeploying || !worker || !amount || !isValidPercentage} 
                  className={`w-full px-4 py-4 rounded-xl font-bold transition-all ${isDeploying || !worker || !amount || !isValidPercentage ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 cursor-pointer hover:scale-[1.02]'}`}
                >
                  {isDeploying ? status : 'Lock Funds & Deploy Escrow'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
