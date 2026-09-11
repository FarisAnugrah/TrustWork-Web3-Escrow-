'use client';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative pointer-events-auto selection:bg-purple-900 selection:text-white">
      {/* Background Ambient */}
      <div className="absolute top-0 right-0 w-[40%] h-[30%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
          <div>
            <Link href="/" className="text-sm text-gray-500 hover:text-white mb-2 inline-block transition-colors">← Back to Home</Link>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Documentation
            </h1>
          </div>
          <Link href="/dashboard" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm border border-white/10">
            Open App ↗
          </Link>
        </header>
        
        <article className="prose prose-invert prose-purple max-w-none glass-card p-8 md:p-12 rounded-3xl border border-white/10">
          <h2>TrustWork - Web3 Escrow for Gig Economy</h2>
          <p className="lead text-gray-300">
            TrustWork is a decentralized escrow platform built for freelancers, informal workers, and clients. It eliminates payment disputes by locking funds in a smart contract and releasing them automatically upon milestone completion.
          </p>
          
          <div className="my-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl">
            <strong>Note:</strong> Built specifically for the <strong>Blockdev.id Hackathon 2026</strong>.
          </div>

          <h3>🏗️ Architecture & Tech Stack</h3>
          <ul>
            <li><strong>Smart Contract:</strong> Solidity <code>^0.8.20</code>, OpenZeppelin (ReentrancyGuard, IERC20)</li>
            <li><strong>Deployment & Testing:</strong> Hardhat</li>
            <li><strong>Network:</strong> Ethereum Sepolia Testnet</li>
            <li><strong>Frontend:</strong> Next.js 14 (App Router), TailwindCSS, Glassmorphism UI</li>
            <li><strong>Web3 Integration:</strong> Wagmi v1, Viem v1, RainbowKit</li>
          </ul>

          <h3>✨ Key Features (MVP)</h3>
          <ol>
            <li><strong>Dynamic Milestones:</strong> Clients can set custom milestones (e.g., 20%, 30%, 50%) up to 5 stages, as long as it totals exactly 100%.</li>
            <li><strong>Hybrid Off-Chain Storage:</strong> Heavy strings (task descriptions) are stored off-chain to minimize gas fees, while crucial financial percentages are locked securely on-chain.</li>
            <li><strong>Automated Payouts:</strong> No manual bank transfers. Once a client clicks "Approve", the exact predefined percentage of USDC is instantly routed to the freelancer's wallet.</li>
            <li><strong>Privacy Isolation:</strong> The Dashboard queries the blockchain and filters the state to only show projects where your connected wallet is either the Client or the Worker.</li>
          </ol>

          <h3>🛡️ Security Measures</h3>
          <ul>
            <li><code>nonReentrant</code> modifiers on all transfer functions to prevent recursive drain attacks.</li>
            <li>Strict Role-Based Access Control (<code>Only client</code> can approve milestones).</li>
            <li>Total milestone calculation is strictly checked on-chain (<code>require(totalPct == 100)</code>).</li>
            <li>Non-custodial Arbiter: The Arbiter cannot withdraw funds for themselves, only distribute them between Client and Worker during a dispute.</li>
          </ul>

          <hr className="my-10 border-white/10" />
          
          <div className="text-center mt-10">
            <p className="text-gray-500 mb-6">Ready to secure your first freelance gig?</p>
            <Link href="/create" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform inline-block">
              Deploy an Escrow Now
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
