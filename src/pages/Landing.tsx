import React from 'react'
import { ArrowRight, Activity, Cpu, Sparkles, TrendingUp, Shield, BarChart3, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

interface LandingProps {
  onNavigate: (page: string) => void
  themeColor: string
}

export default function Landing({ onNavigate, themeColor }: LandingProps) {
  // Mini dynamic solver demonstration cards inside the landing page
  const demoEqu = [
    { a: 1, b: -5, c: 6, title: "Simple Physics Motion", desc: "Classic trajectory model" },
    { a: 1, b: 0, c: -4, title: "Gravitational Orbit", desc: "Zero linear momentum" },
    { a: -2, b: 8, c: -6, title: "Anti-Gravity Thruster Curve", desc: "Negative gravity simulation" }
  ]

  const stats = [
    { value: "99.9%", label: "Accuracy Rate" },
    { value: "0.2ms", label: "Solve Latency" },
    { value: "10M+", label: "Equations Visualized" },
    { value: "180+", label: "Countries Active" }
  ]

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col items-center justify-between pb-12 overflow-hidden">
      
      {/* Top Navbar */}
      <header className="w-full max-w-7xl px-6 py-5 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div 
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-lg font-bold text-lg text-white"
            style={{ boxShadow: `0 0 20px ${themeColor}40` }}
          >
            AG
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Anti Gravity
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                v1.0
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Mathematics Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('login')}
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => onNavigate('signup')}
            className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{ boxShadow: `0 4px 15px ${themeColor}30` }}
          >
            Launch Engine
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="w-full max-w-7xl px-6 flex-grow flex flex-col items-center justify-center text-center mt-12 md:mt-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300 text-xs font-mono mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>INTRODUCING ANTI GRAVITY ALGORITHMIC CALCULUS ENGINE</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
        >
          Visualize Mathematics <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#06B6D4] text-glow-purple">
            Beyond Gravity
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-slate-400 text-sm sm:text-lg mb-10 leading-relaxed font-light"
        >
          A futuristic SaaS workspace for solving, analyzing, and plotting quadratic equations. Experience real-time interactive calculations, AI step explanations, and high-fidelity physics graph animations.
        </motion.p>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-20 justify-center w-full max-w-md"
        >
          <button
            onClick={() => onNavigate('signup')}
            className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white rounded-2xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 hover:opacity-95 shadow-xl transition-all active:scale-95 group"
            style={{ boxShadow: `0 8px 30px ${themeColor}40` }}
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="px-8 py-4 font-semibold text-slate-300 hover:text-white rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition-all active:scale-95 glass-panel"
          >
            Explore Graphs
          </button>
        </motion.div>

        {/* Interactive Equation Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Instant Trajectory Modeling</h3>
            <p className="text-slate-400 text-xs">Pick a pre-configured vector equation to analyze right away</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {demoEqu.map((demo, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigate('login')}
                className="glass-panel glass-panel-hover p-6 rounded-2xl cursor-pointer border border-white/5 relative group overflow-hidden"
              >
                {/* Glow dot indicator */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400 animate-pulse glow-cyan" />
                
                <h4 className="font-semibold text-sm text-slate-300 group-hover:text-cyan-300 transition-colors mb-1">{demo.title}</h4>
                <p className="text-slate-500 text-[11px] font-mono mb-4">{demo.desc}</p>
                
                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-3 font-mono text-center">
                  <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {demo.a === 1 ? '' : demo.a === -1 ? '-' : demo.a}x² 
                    {demo.b > 0 ? ` + ${demo.b}` : demo.b < 0 ? ` - ${Math.abs(demo.b)}` : ''}x 
                    {demo.c > 0 ? ` + ${demo.c}` : demo.c < 0 ? ` - ${Math.abs(demo.c)}` : ''} = 0
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Beautiful statistics cards */}
        <section className="w-full max-w-5xl mt-24 border-t border-slate-800/60 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Grid */}
        <section className="w-full max-w-5xl mt-28">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">AI Powered Physics Computation</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
              Supercharge your research or studies with professional mathematical plotting capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-violet-400" />
              </div>
              <h4 className="font-bold text-white text-base mb-2">Discriminant Deep Dive</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Receive instant root nature classification, real or complex analysis, and a step-by-step calculus walkthrough.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="font-bold text-white text-base mb-2">Interactive Parabola Graphing</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Zoom, pan, and hover over coordinates in real-time. Highlights focus points, directrix, y-intercepts, and vertex parameters.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="font-bold text-white text-base mb-2">Export Data Options</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Instantly capture vector graph plots as high-quality PNGs, and save mathematically typed solutions as PDFs.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl px-6 border-t border-slate-800/40 pt-8 mt-24 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 z-10">
        <p>© 2026 Anti Gravity Mathematics Inc. All rights reserved.</p>
        <div className="flex gap-6 font-mono text-[10px]">
          <span className="hover:text-slate-300 cursor-pointer">Security Protocol</span>
          <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-300 cursor-pointer">API Integration</span>
        </div>
      </footer>

    </div>
  )
}
