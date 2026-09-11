'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-black relative overflow-hidden">
      
      {/* Background Gradients (Thirdweb style) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[150px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[150px] opacity-30 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="z-10 w-full max-w-7xl flex items-center justify-between py-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <span className="font-bold text-white text-lg">T</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">TrustWork</h1>
        </div>
        <ConnectButton />
      </nav>

      {/* Hero Section */}
      <div className="z-10 flex-1 flex flex-col items-center justify-center text-center mt-20 max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400 tracking-tight mb-8 neon-glow">
          Build Trust.<br/> Without Boundaries.
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
          The decentralized escrow platform for the gig economy. 
          Lock funds, approve milestones, and release payments automatically with smart contracts.
        </p>
        
        <div className="flex gap-4">
          <Link href="/dashboard" className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Launch App
          </Link>
          <a href="https://github.com/FarisAnugrah/TrustWork-Web3-Escrow-" target="_blank" rel="noreferrer" className="px-8 py-4 bg-transparent border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            View Source
          </a>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="z-10 w-full text-center pb-8 pt-20 text-sm text-gray-600">
        Built for Hackathon. Powered by Polygon & Next.js
      </footer>
    </main>
  );
}
