'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <h1 className="text-2xl font-bold text-black">TrustWork Escrow</h1>
        <ConnectButton />
      </div>
      <div className="mt-24 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Kerja Tenang, Bayaran Aman</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Sistem Rekber Web3 berbasis Smart Contract untuk Freelancer dan Tukang. Tanpa penengah, tanpa drama.
        </p>
      </div>
    </main>
  );
}
