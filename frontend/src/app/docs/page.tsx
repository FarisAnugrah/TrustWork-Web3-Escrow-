'use client';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';

export default function DocsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  useEffect(() => setMounted(true), []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black relative overflow-x-hidden selection:bg-purple-900 selection:text-white font-sans w-full">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900 rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      {/* Navbar */}
      <nav className="w-full max-w-7xl flex items-center justify-between py-6 px-6 lg:px-8 border-b border-white/10 relative z-50">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 border border-white/10">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white hidden sm:block">TrustWork Docs</h1>
        </Link>
        <div className="flex items-center gap-6 pointer-events-auto">
          <Link href="/dashboard" className="text-sm font-bold text-gray-300 hover:text-white transition-colors hidden md:block">Launch App ↗</Link>
          {mounted && <ConnectButton />}
        </div>
      </nav>

      <div className="w-full max-w-7xl flex flex-col md:flex-row relative z-10 flex-1 px-6 lg:px-8 py-12 gap-12 pointer-events-auto">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-12">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Documentation</h3>
            <ul className="space-y-2 border-l border-white/10 ml-2 pl-4">
              <li>
                <button 
                  onClick={() => setActiveTab('overview')} 
                  className={`text-sm w-full text-left transition-colors ${activeTab === 'overview' ? 'text-purple-400 font-bold -ml-[17px] pl-4 border-l-2 border-purple-500' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Feature Guide & Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('architecture')} 
                  className={`text-sm w-full text-left transition-colors ${activeTab === 'architecture' ? 'text-purple-400 font-bold -ml-[17px] pl-4 border-l-2 border-purple-500' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Smart Contract Architecture
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('workflow')} 
                  className={`text-sm w-full text-left transition-colors ${activeTab === 'workflow' ? 'text-purple-400 font-bold -ml-[17px] pl-4 border-l-2 border-purple-500' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  User Workflow
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('security')} 
                  className={`text-sm w-full text-left transition-colors ${activeTab === 'security' ? 'text-purple-400 font-bold -ml-[17px] pl-4 border-l-2 border-purple-500' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Security Details
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl pb-32">
          
          {activeTab === 'overview' && (
            <div className="animate-in fade-in duration-500">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-6">
                Last updated: September 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">TrustWork Feature Guide</h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-12">
                TrustWork is a decentralized escrow platform that eliminates payment disputes for freelancers. Learn how our smart contracts handle funds securely without intermediaries.
              </p>

              <div className="glass-card rounded-2xl p-8 border border-white/10 mb-12 bg-black/40">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  The Core Problem
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The gig economy is broken by trust issues. Clients hesitate to pay upfront deposits fearing workers might vanish, while workers risk delivering projects without payment guarantees. 
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Traditional escrow platforms (like Upwork or Fiverr) solve this but charge exorbitant fees (up to 20%) and take days to process bank transfers.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Key Features</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automated Instant Payouts</h3>
                    <p className="text-gray-400 leading-relaxed">
                      No human intervention required. Once the client clicks "Approve", the Smart Contract instantly routes the pre-agreed USDC percentage directly to the freelancer's wallet in less than 3 seconds.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/30">
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Dynamic Custom Milestones</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Clients are not restricted to 50/50 splits. They can create up to 5 customized stages (e.g., 20% Initial, 30% Middle, 50% Final), providing maximum flexibility for complex projects.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.95 11.95 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Non-Custodial Architecture</h3>
                    <p className="text-gray-400 leading-relaxed">
                      TrustWork does not hold user funds. Funds are held in immutable, open-source smart contracts on the Ethereum blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">Contract Architecture</h1>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg mb-8">
                  TrustWork utilizes a dual-storage approach to solve the blockchain gas fee trilemma, ensuring interactions remain affordable for everyday gig workers.
                </p>

                <h3 className="text-2xl font-bold text-white mb-4">Hybrid State Storage</h3>
                <p className="text-gray-400 mb-6">
                  Storing heavy strings (like task descriptions or project names) on the Ethereum blockchain is prohibitively expensive. TrustWork separates financial state from UI context:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                      <h4 className="text-white font-bold m-0">1. On-Chain (Solidity)</h4>
                    </div>
                    <ul className="list-disc pl-5 text-gray-400 text-sm space-y-2 m-0">
                      <li>Wallet Addresses (Client, Worker, Arbiter)</li>
                      <li>Total Fund Value (USDC)</li>
                      <li>Milestone Percentages (e.g., [50, 50])</li>
                      <li>Approval States & Current Index</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/10 border border-purple-500/30 p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      <h4 className="text-purple-300 font-bold m-0">2. Off-Chain (Local/IPFS)</h4>
                    </div>
                    <ul className="list-disc pl-5 text-gray-400 text-sm space-y-2 m-0">
                      <li>Project Names</li>
                      <li>Milestone String Descriptions</li>
                      <li>Chat History (If applicable)</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">Core Structs</h3>
                <pre className="bg-black border border-gray-800 p-4 rounded-xl text-gray-300 overflow-x-auto text-sm mb-8 font-mono shadow-inner">
{`struct Milestone {
    uint8 percentage;
    bool isApproved;
}

struct Project {
    address client;
    address worker;
    uint256 totalAmount;
    IERC20 token;
    ProjectStatus status;
    uint8 currentMilestone;
    address arbiter;
}`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">User Workflow</h1>
              
              <div className="space-y-12">
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-8 top-10 bottom-0 w-0.5 bg-gray-800"></div>
                  
                  {/* Step 1 */}
                  <div className="relative flex flex-col md:flex-row gap-8 mb-12 group">
                    <div className="hidden md:flex absolute left-8 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-4 border-purple-500 items-center justify-center z-10 group-hover:scale-125 transition-transform"></div>
                    <div className="md:w-64 pt-1 shrink-0 md:text-right md:pr-12 hidden md:block">
                      <h4 className="text-xl font-bold text-white">1. Creation</h4>
                      <p className="text-gray-500 text-sm">Client action</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/10 w-full bg-black/40 group-hover:border-purple-500/30 transition-colors">
                      <h4 className="text-xl font-bold text-white md:hidden mb-2">1. Creation</h4>
                      <p className="text-gray-400 leading-relaxed">The client navigates to the Create page, inputs the worker's wallet address, the total project value in USDC, and defines custom milestone splits. The client signs 2 transactions: Token Approval and Contract Creation.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex flex-col md:flex-row gap-8 mb-12 group">
                    <div className="hidden md:flex absolute left-8 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-4 border-blue-500 items-center justify-center z-10 group-hover:scale-125 transition-transform"></div>
                    <div className="md:w-64 pt-1 shrink-0 md:text-right md:pr-12 hidden md:block">
                      <h4 className="text-xl font-bold text-white">2. Delivery</h4>
                      <p className="text-gray-500 text-sm">Worker action</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/10 w-full bg-black/40 group-hover:border-blue-500/30 transition-colors">
                      <h4 className="text-xl font-bold text-white md:hidden mb-2">2. Delivery</h4>
                      <p className="text-gray-400 leading-relaxed">The worker checks the Dashboard to verify that the project state is <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-300">ACTIVE</code> and the total value is locked. The worker then proceeds to deliver the off-chain work (e.g., sending code, designs).</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex flex-col md:flex-row gap-8 group">
                    <div className="hidden md:flex absolute left-8 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-4 border-green-500 items-center justify-center z-10 group-hover:scale-125 transition-transform"></div>
                    <div className="md:w-64 pt-1 shrink-0 md:text-right md:pr-12 hidden md:block">
                      <h4 className="text-xl font-bold text-white">3. Payout</h4>
                      <p className="text-gray-500 text-sm">Client & Contract</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/10 w-full bg-black/40 group-hover:border-green-500/30 transition-colors">
                      <h4 className="text-xl font-bold text-white md:hidden mb-2">3. Payout</h4>
                      <p className="text-gray-400 leading-relaxed">The client reviews the work and clicks "Approve Next Milestone". The smart contract automatically calculates the percentage owed and routes the USDC directly to the worker's balance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">Security Details</h1>
              
              <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-xl mb-8 flex gap-4 items-start">
                <svg className="w-6 h-6 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <div>
                  <h3 className="text-red-400 font-bold mb-2">Re-entrancy Protections</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    All external token transfers in the TrustWork contract are protected using OpenZeppelin's <code>nonReentrant</code> modifier. Additionally, we enforce the <strong>Checks-Effects-Interactions</strong> pattern by updating the milestone state <em>before</em> executing the token transfer.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card p-6 rounded-xl border border-white/10 bg-black/40">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                    Role-Based Access
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Functions are strictly isolated. The <code>approveMilestone</code> function can <strong>only</strong> be called by the <code>p.client</code> address. The worker cannot approve their own work.
                  </p>
                </div>
                <div className="glass-card p-6 rounded-xl border border-white/10 bg-black/40">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    Mathematical Integrity
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    During project creation, a <code>for</code> loop iterates through the provided milestone array and enforces <code>require(totalPct == 100)</code>. It is mathematically impossible to deploy a contract where funds get permanently stuck.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl border border-white/10 bg-black/40">
                <h3 className="text-xl font-bold text-white mb-4">Dispute Resolution (The Arbiter)</h3>
                <p className="text-gray-400 leading-relaxed mb-6 border-b border-white/10 pb-6">
                  If a project enters a disputed state, a designated 3rd-party Arbiter steps in. The Arbiter is purely non-custodial.
                </p>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="leading-relaxed">Arbiter can dictate the split percentage (e.g. 70% refund to client, 30% to worker).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    <span className="leading-relaxed">Arbiter <strong>cannot</strong> transfer the funds to their own wallet.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    <span className="leading-relaxed">Arbiter cannot trigger a dispute. Only the Client or Worker can initiate a freeze.</span>
                  </li>
                </ul>
              </div>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}
