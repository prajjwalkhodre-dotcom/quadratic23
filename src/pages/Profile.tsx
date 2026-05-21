import React from 'react'
import { User, Award, Shield, Key, Compass, Calendar, Trophy, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProfileProps {
  user: { name: string; email: string } | null
  historyLength: number
  themeColor: string
}

export default function Profile({ user, historyLength, themeColor }: ProfileProps) {
  const cadetId = 'AG-CADET-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  const registerDate = 'May 2026'

  // Dynamic achievements based on solved history count!
  const achievements = [
    {
      title: 'First Calibration',
      desc: 'Formulate and solve your first quadratic vector equation.',
      unlocked: historyLength > 0,
      icon: Trophy,
      color: 'text-amber-400'
    },
    {
      title: 'Orbital Pioneer',
      desc: 'Plot or resolve 5 unique parabola paths.',
      unlocked: historyLength >= 5,
      icon: Compass,
      color: 'text-cyan-400'
    },
    {
      title: 'Quantum Mastermind',
      desc: 'Verify 10 unique solutions inside the local storage cache.',
      unlocked: historyLength >= 10,
      icon: Zap,
      color: 'text-violet-400'
    }
  ]

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto z-10 relative">
      
      {/* Cadet Information ID card */}
      <div className="glass-panel border border-white/5 bg-gradient-to-br from-slate-950/40 via-slate-900/20 to-[#1e1b4b]/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[80px]" />
        
        {/* Cadet Emblem */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-violet-600 via-blue-600 to-cyan-400 flex items-center justify-center font-bold text-4xl text-white shadow-2xl relative">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 blur-sm opacity-50" />
          <span className="relative z-10">{user?.name.charAt(0) || 'C'}</span>
        </div>

        {/* Cadet Data Fields */}
        <div className="space-y-3 min-w-0 text-center md:text-left flex-grow">
          <div className="flex justify-center md:justify-start items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded">
              SECTOR 7 cadet
            </span>
            <span className="text-[10px] font-mono uppercase bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-0.5 rounded">
              VERIFIED CADET ID
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white leading-tight">{user?.name || 'Cadet User'}</h3>
            <p className="text-slate-400 text-xs mt-0.5">{user?.email || 'cadet.orbit@anti-gravity.com'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm pt-2 font-mono text-[10px] text-slate-500">
            <div>
              <span className="block text-slate-400">CADET UNIQUE HASH:</span>
              <span className="text-slate-300 font-bold">{cadetId}</span>
            </div>
            <div>
              <span className="block text-slate-400">ENROLLED PERIOD:</span>
              <span className="text-slate-300 font-bold">{registerDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Achievements grid */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 pl-1">
          <Award className="w-4.5 h-4.5 text-violet-400" style={{ color: themeColor }} />
          Cadet Accomplishments Badges
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((ach, idx) => {
            const IconComp = ach.icon
            return (
              <div
                key={idx}
                className={`glass-panel border rounded-2xl p-5 flex items-start gap-4 transition-all relative overflow-hidden ${
                  ach.unlocked 
                    ? 'border-violet-500/20 bg-slate-950/40 opacity-100' 
                    : 'border-white/5 bg-slate-950/20 opacity-50'
                }`}
              >
                <div className={`p-3 rounded-xl ${ach.unlocked ? 'bg-violet-500/10' : 'bg-slate-900'} border border-white/5`}>
                  <IconComp className={`w-5 h-5 ${ach.unlocked ? ach.color : 'text-slate-500'}`} />
                </div>
                
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-slate-200">{ach.title}</h5>
                  <p className="text-[10px] text-slate-500 leading-normal">{ach.desc}</p>
                  
                  {ach.unlocked ? (
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded inline-block mt-2 font-bold">
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-slate-500 bg-slate-900/60 border border-slate-800 px-1.5 py-0.5 rounded inline-block mt-2">
                      LOCKED
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
