'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black relative overflow-x-hidden selection:bg-purple-900 selection:text-white font-sans">
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900 rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900 rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      {/* Navbar */}
      <nav className="w-full max-w-7xl flex items-center justify-between py-6 px-6 lg:px-8 border-b border-white/10 relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 border border-white/10">
            <span className="font-bold text-white text-xl">T</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white hidden sm:block">TrustWork</h1>
        </div>
        <div className="pointer-events-auto">
           {mounted && <ConnectButton />}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-5xl flex flex-col items-center justify-center text-center mt-24 mb-32 px-6 relative z-10 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-8 backdrop-blur-sm shadow-xl">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Decentralized Escrow 2.0 is Live
        </div>
        
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 tracking-tighter mb-8 pb-2 leading-tight">
          Eliminate Trust Issues. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500" style={{ textShadow: '0 0 40px rgba(138, 43, 226, 0.3)' }}>Get Paid Instantly.</span>
        </h2>
        <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl leading-relaxed">
          The ultimate smart-contract escrow for freelancers. Lock project funds upfront, set dynamic milestones, and trigger automated payouts with zero platform fees.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/dashboard" className="px-10 py-5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Launch Application
          </Link>
          <Link href="/create" className="px-10 py-5 bg-black border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all hover:scale-105 active:scale-95 text-lg">
            Deploy an Escrow
          </Link>
        </div>
      </section>

      {/* Social Proof / Fake Stats */}
      <section className="w-full border-y border-white/10 bg-black/50 backdrop-blur-md py-12 mb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">$0</p>
            <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest">Middleman Fees</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">100%</p>
            <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest">Transparency</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">&lt; 3s</p>
            <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest">Payout Speed</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">5+</p>
            <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest">Milestones</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="w-full max-w-7xl px-6 mb-32 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How TrustWork Operates</h2>
          <p className="text-gray-400 text-lg md:text-xl">A frictionless workflow protected by Ethereum cryptography.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-blue-500/0 -z-10"></div>

          <div className="glass-card p-10 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-colors bg-black/60 backdrop-blur-xl">
            <div className="w-16 h-16 bg-purple-900/50 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-purple-500/30 group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/20">🔒</div>
            <h3 className="text-2xl font-bold text-white mb-4">1. Lock Funds</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Clients deposit stablecoins (USDC) into a decentralized vault. Workers have peace of mind knowing the money is secured upfront.
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-colors bg-black/60 backdrop-blur-xl">
            <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-blue-500/30 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/20">⚙️</div>
            <h3 className="text-2xl font-bold text-white mb-4">2. Work & Approve</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Freelancers deliver the work based on agreed milestones. The client reviews the work and clicks a single button to approve.
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-green-500/30 transition-colors bg-black/60 backdrop-blur-xl">
            <div className="w-16 h-16 bg-green-900/50 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-green-500/30 group-hover:scale-110 transition-transform shadow-lg shadow-green-900/20">💸</div>
            <h3 className="text-2xl font-bold text-white mb-4">3. Instant Payout</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              The Smart Contract instantly routes the funds directly to the worker's wallet. No pending days, no withdrawal fees.
            </p>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="w-full max-w-7xl px-6 mb-32 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 border-b border-white/10 pb-6 text-center md:text-left">Why choose TrustWork?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🛡️", title: "Non-Custodial", desc: "We never hold your funds. The audited smart contract does." },
            { icon: "⚖️", title: "Fair Dispute", desc: "Neutral arbiters resolve conflicts if things go south without holding funds." },
            { icon: "⛽", title: "Gas Optimized", desc: "Hybrid off-chain storage keeps deployment costs extremely low." },
            { icon: "🧩", title: "Custom Milestones", desc: "Break down complex projects into 5 specific automated payment stages." },
            { icon: "🌍", title: "Global Access", desc: "Anyone with an internet connection and a Web3 wallet can participate." },
            { icon: "🕵️", title: "No KYC Required", desc: "Start locking funds and working immediately without identity hurdles." }
          ].map((f, i) => (
            <div key={i} className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-colors flex gap-5">
              <span className="text-3xl shrink-0">{f.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-5xl px-6 mb-32 text-center relative z-10">
        <div className="glass-card p-12 md:p-20 rounded-[3rem] border border-purple-500/30 relative overflow-hidden bg-black/60 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none"></div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10 tracking-tight">Stop chasing invoices.</h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 relative z-10 font-light">Deploy your first escrow contract in less than 60 seconds.</p>
          <Link href="/create" className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:scale-105 transition-all text-xl inline-block relative z-10 shadow-[0_0_40px_rgba(138,43,226,0.4)]">
            Start Now for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">T</span>
            <span className="text-gray-500 text-sm">© 2026 TrustWork. Built for Blockdev.id Hackathon.</span>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Documentation</a>
            <a href={`https://sepolia.etherscan.io/address/${TRUSTWORK_ADDRESS}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">Smart Contract</a>
            <a href="https://github.com/FarisAnugrah/TrustWork-Web3-Escrow-" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
