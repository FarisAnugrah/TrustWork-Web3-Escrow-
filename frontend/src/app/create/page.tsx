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
import toast from 'react-hot-toast';

interface MilestoneInput {
  percentage: string;
  description: string;
}

export default function CreateProject() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [worker, setWorker] = useState('');
  const [amount, setAmount] = useState('');
  
  const [milestones, setMilestones] = useState<MilestoneInput[]>([
    { percentage: '30', description: 'Desain UI/UX Selesai' },
    { percentage: '70', description: 'Testing & Deployment Selesai' }
  ]);
  
  const [status, setStatus] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => setMounted(true), []);

  const totalPercentage = milestones.reduce((a, b) => a + (parseInt(b.percentage) || 0), 0);
  const isValidPercentage = totalPercentage === 100;

  const handleAddMilestone = () => {
    if (milestones.length < 5) {
      setMilestones([...milestones, { percentage: '', description: '' }]);
    }
  };

  const handleRemoveMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const handleMilestoneChange = (index: number, field: 'percentage' | 'description', value: string) => {
    const newMilestones = [...milestones];
    if (field === 'percentage') {
      newMilestones[index].percentage = value;
    } else {
      newMilestones[index].description = value;
    }
    setMilestones(newMilestones);
  };

  const handleCreate = async () => {
    if (!projectName || !worker || !amount) return toast.error('Isi nama proyek, worker, dan amount dengan lengkap');
    if (!isValidPercentage) return toast.error('Total persentase milestone harus tepat 100%');
    
    const hasEmptyDesc = milestones.some(m => !m.description.trim());
    if (hasEmptyDesc) return toast.error('Harap isi semua deskripsi tugas');
    
    try {
      setIsDeploying(true);
      const amountWei = parseUnits(amount, 18);
      const percentagesArr = milestones.map(m => parseInt(m.percentage) || 0);

      // Baca total proyek saat ini untuk menentukan ID proyek baru (untuk penyimpanan off-chain)
      const { createPublicClient, http } = await import('viem');
      const { sepolia } = await import('viem/chains');
      const client = createPublicClient({ chain: sepolia, transport: http('https://ethereum-sepolia-rpc.publicnode.com') });
      
      const currentCount = await client.readContract({
        address: TRUSTWORK_ADDRESS,
        abi: TrustWorkABI,
        functionName: 'projectCount',
      });
      const newProjectId = Number(currentCount);

      // Simpan Nama Proyek & Deskripsi secara Off-Chain
      const tempProjectData = { 
        name: projectName,
        worker, 
        totalAmount: amount, 
        milestones: milestones 
      };
      localStorage.setItem(`trustwork_draft_${newProjectId}`, JSON.stringify(tempProjectData));

      setStatus('Minta Izin (Approve)...');
      const approveLoading = toast.loading('Meminta izin akses USDC...');
      const { request: approveReq } = await prepareWriteContract({
        address: USDC_ADDRESS,
        abi: MockUSDCABI,
        functionName: 'approve',
        args: [TRUSTWORK_ADDRESS, amountWei],
      });
      const { hash: approveHash } = await writeContract(approveReq);
      await waitForTransaction({ hash: approveHash });
      toast.dismiss(approveLoading);
      toast.success('Izin USDC diberikan!');

      setStatus('Mengunci Dana...');
      const createLoading = toast.loading('Mengunci dana ke Smart Contract...');
      const { request: createReq } = await prepareWriteContract({
        address: TRUSTWORK_ADDRESS,
        abi: TrustWorkABI,
        functionName: 'createProject',
        args: [worker as `0x${string}`, amountWei, USDC_ADDRESS, percentagesArr],
      });
      const { hash: createHash } = await writeContract(createReq);
      await waitForTransaction({ hash: createHash });
      toast.dismiss(createLoading);

      toast.success(
        <div>
          Proyek "{projectName}" berhasil dibuat!<br/>
          <a href={`https://sepolia.etherscan.io/tx/${createHash}`} target="_blank" rel="noreferrer" className="text-purple-400 underline text-xs mt-1 block">
            Lihat di Explorer ↗
          </a>
        </div>,
        { duration: 5000 }
      );

      setStatus('Sukses Dibuat.');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);

    } catch (e: any) {
      console.error(e);
      toast.dismiss();
      toast.error('Gagal: ' + (e.shortMessage || e.message));
      setStatus('');
    } finally {
      setIsDeploying(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative pointer-events-auto">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-white">← Back to Dashboard</Link>
        <ConnectButton />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-extrabold mb-4">Secure a Gig</h1>
          <p className="text-gray-400 mb-8">Lock funds in smart contract. Released only when specific tasks are approved.</p>
          
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Dynamic Milestones</h3>
            <p className="text-sm text-gray-500 mb-6">
              Define the specific tasks (deliverables) and the percentage of funds allocated to each. 
              The Smart Contract handles the math.
            </p>
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/50 border border-gray-800">
              <span className="text-gray-400">Total Funds Distributed:</span>
              <span className={`text-xl font-bold ${isValidPercentage ? 'text-green-400' : 'text-red-400'}`}>
                {totalPercentage}%
              </span>
            </div>
            {!isValidPercentage && <p className="text-red-400 text-xs mt-2">Must equal exactly 100%.</p>}
          </div>
        </div>
        
        <div className="lg:col-span-3 bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl">
          <div className="space-y-6">
            
            {/* New Project Name Field */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Project Name</label>
              <input 
                className="w-full bg-black border border-gray-700 p-3 rounded-xl text-white font-sans text-sm" 
                placeholder="e.g. Website Redesign MVP" 
                value={projectName} 
                onChange={e => setProjectName(e.target.value)} 
                maxLength={40}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Worker Address</label>
                <input className="w-full bg-black border border-gray-700 p-3 rounded-xl text-white font-mono text-sm" placeholder="0x..." value={worker} onChange={e => setWorker(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Total Amount (mUSDC)</label>
                <input className="w-full bg-black border border-gray-700 p-3 rounded-xl text-white font-mono text-sm" placeholder="100" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm text-gray-300">Tasks & Payouts</label>
                <button onClick={handleAddMilestone} disabled={milestones.length >= 5} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded">
                  + Add Task
                </button>
              </div>
              
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-black/30 p-3 rounded-xl border border-gray-800">
                    <span className="text-gray-500 font-mono text-xs w-6 shrink-0 pt-3 sm:pt-0">#{i+1}</span>
                    
                    <div className="w-full">
                      <input 
                        type="text" 
                        placeholder="Task description (e.g. Frontend Done)"
                        className="w-full bg-transparent border-b border-gray-700 focus:border-purple-500 p-2 text-white text-sm outline-none" 
                        value={m.description}
                        onChange={(e) => handleMilestoneChange(i, 'description', e.target.value)}
                      />
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <input 
                        type="number" 
                        className="w-20 bg-black border border-gray-700 p-2 rounded-lg text-white font-mono text-sm text-center" 
                        value={m.percentage}
                        onChange={(e) => handleMilestoneChange(i, 'percentage', e.target.value)}
                      />
                      <span className="text-gray-500 text-sm">%</span>
                      <button 
                        onClick={() => handleRemoveMilestone(i)}
                        disabled={milestones.length <= 1}
                        className="text-gray-600 hover:text-red-400 p-2 disabled:opacity-0"
                      >✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-6">
              {!address ? (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-center text-sm">Harap hubungkan dompet (Connect Wallet) terlebih dahulu.</div>
              ) : (
                <button 
                  onClick={handleCreate} 
                  disabled={isDeploying || !projectName || !worker || !amount || !isValidPercentage} 
                  className={`w-full px-4 py-4 rounded-xl font-bold transition-all ${isDeploying || !projectName || !worker || !amount || !isValidPercentage ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 cursor-pointer hover:scale-[1.02]'}`}
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
