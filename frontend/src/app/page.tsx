'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-black relative overflow-hidden selection:bg-purple-900 selection:text-white">
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      {/* Navbar */}
      <nav className="z-10 w-full max-w-7xl flex items-center justify-between py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 border border-white/10">
            <span className="font-bold text-white text-xl">T</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white hidden sm:block">TrustWork</h1>
        </div>
        <div className="relative z-50 pointer-events-auto">
           {mounted && <ConnectButton />}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="z-10 flex-1 flex flex-col items-center justify-center text-center mt-20 max-w-4xl relative pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Hackathon MVP - Live on Sepolia Testnet
        </div>
        
        <h2 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400 tracking-tighter mb-8 pb-2" style={{ textShadow: '0 0 20px rgba(138, 43, 226, 0.4)' }}>
          Build Trust.<br/> Without Boundaries.
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
          The decentralized escrow platform for the gig economy. 
          Lock funds, approve milestones, and release payments automatically.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-50">
          <Link href="/dashboard" className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 text-lg cursor-pointer">
            Launch App
          </Link>
          <a href="https://github.com/FarisAnugrah/TrustWork-Web3-Escrow-" target="_blank" rel="noreferrer" className="px-8 py-4 bg-black border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all hover:scale-105 active:scale-95 text-lg cursor-pointer">
            View Source
          </a>
        </div>
      </div>

      <footer className="z-10 w-full text-center pb-8 pt-10 text-sm text-gray-600 border-t border-white/10 mt-auto">
        Built for Hackathon. Powered by Polygon & Next.js
      </footer>
    </main>
  );
}
