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
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link href="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Buat Proyek
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Status Smart Contract</h2>
        <p className="text-gray-600">Total Proyek Terdaftar: {projectCount !== undefined ? Number(projectCount) : '0'}</p>
        <div className="mt-4 p-4 bg-yellow-50 rounded-md border border-yellow-200">
          <p className="text-yellow-800 text-sm">
            Tampilan riwayat proyek akan berjalan setelah Smart Contract di-deploy ke jaringan (Testnet) dan alamat kontrak di-update di <code>lib/config.ts</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
