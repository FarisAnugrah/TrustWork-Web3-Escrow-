'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black relative overflow-x-hidden selection:bg-purple-900 selection:text-white">
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      {/* Navbar */}
      <nav className="z-10 w-full max-w-7xl flex items-center justify-between py-6 px-6 lg:px-8 border-b border-white/10">
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
      <div className="z-10 flex-1 flex flex-col items-center justify-center text-center mt-24 mb-32 max-w-5xl px-6 relative pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-8 backdrop-blur-sm shadow-xl">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Decentralized Escrow 2.0 is Live
        </div>
        
        <h2 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 tracking-tighter mb-8 pb-2 leading-tight">
          Eliminate Trust Issues. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500" style={{ textShadow: '0 0 40px rgba(138, 43, 226, 0.3)' }}>Get Paid Instantly.</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl leading-relaxed">
          The ultimate smart-contract escrow for freelancers. Lock project funds upfront, set dynamic milestones, and trigger automated payouts with zero platform fees.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-50">
          <Link href="/dashboard" className="px-10 py-5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 text-lg cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Launch Application
          </Link>
          <Link href="/create" className="px-10 py-5 bg-black border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all hover:scale-105 active:scale-95 text-lg cursor-pointer">
            Deploy an Escrow
          </Link>
        </div>
      </div>

      {/* Social Proof / Fake Stats for Vision */}
      <div className="z-10 w-full border-y border-white/10 bg-black/50 backdrop-blur-md py-12 mb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          <div>
            <p className="text-4xl font-bold text-white mb-2">$0</p>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Middleman Fees</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-2">100%</p>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">On-Chain Transparency</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-2">&lt; 3s</p>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Payout Speed</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-400 mb-2">5+</p>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Dynamic Milestones</p>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="z-10 w-full max-w-7xl px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How TrustWork Operates</h2>
          <p className="text-gray-400 text-lg">A frictionless workflow protected by Ethereum cryptography.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-blue-500/0 -z-10"></div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="w-16 h-16 bg-purple-900/50 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform">🔒</div>
            <h3 className="text-2xl font-bold text-white mb-3">1. Lock Funds</h3>
            <p className="text-gray-400 leading-relaxed">
              Clients deposit stablecoins (USDC) into a decentralized vault. Workers have peace of mind knowing the money is secured upfront.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform">⚙️</div>
            <h3 className="text-2xl font-bold text-white mb-3">2. Work & Approve</h3>
            <p className="text-gray-400 leading-relaxed">
              Freelancers deliver the work based on agreed milestones. The client reviews the work and clicks a single button to approve.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="w-16 h-16 bg-green-900/50 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-green-500/30 group-hover:scale-110 transition-transform">💸</div>
            <h3 className="text-2xl font-bold text-white mb-3">3. Instant Payout</h3>
            <p className="text-gray-400 leading-relaxed">
              The Smart Contract instantly routes the funds directly to the worker's wallet. No pending days, no withdrawal fees.
            </p>
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="z-10 w-full max-w-7xl px-6 mb-24">
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Why choose TrustWork?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: "🛡️", title: "Non-Custodial", desc: "We never hold your funds. The smart contract does." },
            { icon: "⚖️", title: "Fair Dispute", desc: "Neutral arbiters resolve conflicts if things go south." },
            { icon: "⛽", title: "Gas Optimized", desc: "Hybrid off-chain storage keeps deployment costs extremely low." },
            { icon: "🧩", title: "Custom Milestones", desc: "Break down complex projects into 5 specific payment stages." },
            { icon: "🌍", title: "Global Access", desc: "Anyone with an internet connection and a wallet can participate." },
            { icon: "🕵️", title: "No KYC Required", desc: "Start locking funds and working immediately without identity hurdles." }
          ].map((f, i) => (
            <div key={i} className="bg-black/50 p-6 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors flex gap-4">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="z-10 w-full max-w-4xl px-6 mb-32 text-center">
        <div className="glass-card p-12 rounded-[3rem] border border-purple-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Stop chasing invoices.</h2>
          <p className="text-xl text-gray-400 mb-10 relative z-10">Deploy your first escrow contract in less than 60 seconds.</p>
          <Link href="/create" className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-all text-lg inline-block relative z-10 shadow-xl shadow-purple-500/25">
            Start Now for Free
          </Link>
        </div>
      </div>

      <footer className="z-10 w-full text-center py-10 text-sm text-gray-600 border-t border-white/10 bg-black mt-auto flex flex-col md:flex-row justify-between items-center px-10 gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white bg-white/10 px-2 py-1 rounded">T</span>
          <span>© 2026 TrustWork. Built for Blockdev.id</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Smart Contract</a>
          <a href="https://github.com/FarisAnugrah/TrustWork-Web3-Escrow-" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
