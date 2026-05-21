import React, { useState } from 'react'
import { 
  Play, 
  Trash2, 
  Share2, 
  ArrowRight, 
  HelpCircle, 
  Calculator, 
  LineChart, 
  Sparkles, 
  History, 
  Award,
  BookOpen,
  ArrowUpRight
} from 'lucide-react'
import { motion } from 'framer-motion'

interface EquationHistoryItem {
  id: string
  a: number
  b: number
  c: number
  discriminant: number
  roots: {
    x1: number | string
    x2: number | string
    type: string
  }
  date: string
}

interface DashboardProps {
  user: { name: string; email: string } | null
  onNavigate: (page: string) => void
  history: EquationHistoryItem[]
  onClearHistory: () => void
  onLoadEquation: (a: number, b: number, c: number) => void
  addToast: (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning') => void
  themeColor: string
}

export default function Dashboard({
  user,
  onNavigate,
  history,
  onClearHistory,
  onLoadEquation,
  addToast,
  themeColor
}: DashboardProps) {
  
  // Custom mock analytics based on actual history size!
  const solvedCount = history.length
  const realCount = history.filter(item => item.roots.type !== 'Complex / Imaginary').length
  const complexCount = solvedCount - realCount
  const userRank = solvedCount > 10 ? 'Senior Analyst' : solvedCount > 4 ? 'Quantum Pilot' : 'Cadet Trainee'

  // Quick solver samples
  const randomEquations = [
    { a: 1, b: -2, c: -3, label: 'Real Roots (-1, 3)' },
    { a: 1, b: 4, c: 4, label: 'Single Root (-2)' },
    { a: 2, b: 2, c: 5, label: 'Complex Conjugates' }
  ]

  const handleSolveRandom = (a: number, b: number, c: number) => {
    onLoadEquation(a, b, c)
    onNavigate('solver')
    addToast('Vector Calibrated', `Coefficient parameters loaded: a=${a}, b=${b}, c=${c}`, 'success')
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto z-10 relative">
      
      {/* Welcome Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel border border-white/5 bg-gradient-to-r from-slate-900/90 via-slate-950/80 to-[#1e1b4b]/30 p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="space-y-2 select-none">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-md">
              GRAVITY COEFFICIENT STABLE
            </span>
            <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md">
              AI CONNECTED
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Welcome back, {user?.name || 'Cadet'}!
          </h2>
          <p className="text-slate-400 text-xs max-w-lg leading-relaxed">
            The mathematical models are active. You are categorized as <span className="text-violet-400 font-semibold" style={{ color: themeColor }}>{userRank}</span>. Solve quadratic vectors to calibrate satellite trajectory trajectories.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => onNavigate('solver')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-xs hover:opacity-90 active:scale-95 transition-all shadow-md group"
            style={{ boxShadow: `0 4px 15px ${themeColor}30` }}
          >
            <Calculator className="w-4 h-4" />
            Launch Solver Terminal
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => onNavigate('graph')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs active:scale-95 transition-all"
          >
            <LineChart className="w-4 h-4" />
            Plot Parabola Grid
          </button>
        </div>
      </motion.div>

      {/* Analytics Telemetry Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Solved Card */}
        <div className="glass-panel border border-white/5 bg-slate-950/40 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">SOLUTIONS FORMED</p>
            <h3 className="text-2xl font-extrabold text-white">{solvedCount}</h3>
            <p className="text-[10px] text-slate-400">Recorded in storage buffer</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-violet-400" style={{ color: themeColor }} />
          </div>
        </div>

        {/* Real Roots Card */}
        <div className="glass-panel border border-white/5 bg-slate-950/40 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">REAL VECTORS</p>
            <h3 className="text-2xl font-extrabold text-emerald-400">{realCount}</h3>
            <p className="text-[10px] text-slate-400">Crossing Cartesian X-axis</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <LineChart className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Complex Roots Card */}
        <div className="glass-panel border border-white/5 bg-slate-950/40 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">COMPLEX VECTORS</p>
            <h3 className="text-2xl font-extrabold text-cyan-400">{complexCount}</h3>
            <p className="text-[10px] text-slate-400">Imaginary orbital paths</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        {/* Active Rank Card */}
        <div className="glass-panel border border-white/5 bg-slate-950/40 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">RANK LEVEL</p>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{userRank}</h3>
            <p className="text-[10px] text-slate-400">Rank based on solved systems</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
      </div>

      {/* Main Grid: History and Quick Calibration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent History Panel */}
        <div className="glass-panel border border-white/5 bg-slate-950/30 rounded-3xl p-6 lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-violet-400" style={{ color: themeColor }} />
              Quantum Solver Log history
            </h4>
            {solvedCount > 0 && (
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-rose-400 transition-colors uppercase border border-slate-800/80 px-2.5 py-1.5 rounded-lg bg-slate-900/30 hover:bg-rose-500/5 active:scale-95"
              >
                <Trash2 className="w-3 h-3" />
                Clear Logs
              </button>
            )}
          </div>

          {solvedCount === 0 ? (
            <div className="h-56 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">Terminal logs are currently empty</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Solve a quadratic vector to store system equations.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="text-slate-500 font-mono text-[9px] uppercase tracking-wider border-b border-white/5 pb-2">
                    <th className="py-2.5">Equation Vector</th>
                    <th className="py-2.5">Discriminant</th>
                    <th className="py-2.5">Root Classification</th>
                    <th className="py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/2">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-white/2 group transition-all">
                      <td className="py-3 font-mono font-semibold text-slate-200">
                        {item.a}x² {item.b >= 0 ? `+${item.b}` : item.b}x {item.c >= 0 ? `+${item.c}` : item.c} = 0
                      </td>
                      <td className="py-3">
                        <span className={`font-mono font-semibold ${item.discriminant > 0 ? 'text-emerald-400' : item.discriminant === 0 ? 'text-slate-300' : 'text-cyan-400'}`}>
                          {item.discriminant}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          item.roots.type === 'Complex / Imaginary'
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                            : item.roots.type === 'Real and Equal'
                            ? 'bg-slate-500/10 text-slate-300 border border-slate-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {item.roots.type}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              onLoadEquation(item.a, item.b, item.c)
                              onNavigate('solver')
                              addToast('Loaded Vector', 'Values injected into Solver Module.', 'success')
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-slate-600 hover:text-white transition-all text-slate-400 active:scale-95"
                            title="Load Coefficients"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Calibration Cards / Preset Systems */}
        <div className="glass-panel border border-white/5 bg-slate-950/30 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Quick Presets Calibration
            </h4>
            <p className="text-slate-400 text-xs">
              Load ready-made coefficient coordinates directly into the processor to analyze standard parabola types.
            </p>

            <div className="space-y-3">
              {randomEquations.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSolveRandom(preset.a, preset.b, preset.c)}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-violet-500/40 hover:bg-slate-900/60 transition-all cursor-pointer flex justify-between items-center group active:scale-[0.98]"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-white transition-colors">
                      {preset.a}x² {preset.b >= 0 ? `+${preset.b}` : preset.b}x {preset.c >= 0 ? `+${preset.c}` : preset.c} = 0
                    </span>
                    <p className="text-[10px] text-slate-500 font-mono">{preset.label}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4 text-[10px] text-slate-500 font-mono flex items-center gap-1.5 justify-center">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Shortcuts: Press <kbd className="bg-slate-900 px-1 py-0.5 rounded border border-white/10 font-bold">S</kbd> for solver terminal</span>
          </div>
        </div>

      </div>

    </div>
  )
}
