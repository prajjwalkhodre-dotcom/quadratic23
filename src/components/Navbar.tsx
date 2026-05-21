import React, { useState } from 'react'
import { Sun, Moon, Bell, Search, Settings, ShieldAlert, Sparkles, KeyRound } from 'lucide-react'

interface NavbarProps {
  currentPage: string
  user: { name: string; email: string } | null
  themeColor: string
  onChangeThemeColor: (color: string) => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
  addToast: (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning') => void
  onNavigate: (page: string) => void
}

export default function Navbar({
  currentPage,
  user,
  themeColor,
  onChangeThemeColor,
  isDarkMode,
  onToggleDarkMode,
  addToast,
  onNavigate
}: NavbarProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showBellDropdown, setShowBellDropdown] = useState(false)

  // Cyber Themes customizer colors palette
  const glowColors = [
    { value: '#8B5CF6', name: 'Purple Nebula' },
    { value: '#3B82F6', name: 'Cyber Blue' },
    { value: '#06B6D4', name: 'Neon Cyan' },
    { value: '#10B981', name: 'Emerald Laser' },
    { value: '#EC4899', name: 'Pink Singularity' }
  ]

  const alerts = [
    { id: 1, title: 'Calculus Updated', detail: 'Step-by-step PDF solutions are now formatted with LaTeX style math notations.' },
    { id: 2, title: 'Session Established', detail: 'Secure quantum access keys have been synced with local storage buffers.' }
  ]

  // Dynamic titles based on active workspace page
  const pageTitles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Terminal HUD', subtitle: 'Global physics calculations index and statistics telemetry.' },
    solver: { title: 'Equation Solver', subtitle: 'Resolve standard ax² + bx + c equations with full vector breakdown.' },
    graph: { title: 'Graph Analysis', subtitle: 'Dynamic zoomable coordinate grid plotting interactive parabolas.' },
    profile: { title: 'Cadet Profile Identity', subtitle: 'Quantum profile variables, badges, and system credentials.' },
    settings: { title: 'Calculus Engine Options', subtitle: 'Configure algorithmic tolerances, dark/light modes, and custom glows.' }
  }

  const currentMeta = pageTitles[currentPage] || { title: 'Mathematics Engine', subtitle: 'AI-assisted quadratic equation modeling terminal.' }

  return (
    <header className="border-b border-white/5 bg-slate-950/20 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10 select-none">
      
      {/* Title block */}
      <div>
        <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          {currentMeta.title}
          {currentPage === 'solver' && (
            <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
              SOLVER MODULE ACTIVE
            </span>
          )}
        </h1>
        <p className="text-[10px] text-slate-400 font-light mt-0.5">{currentMeta.subtitle}</p>
      </div>

      {/* Action block */}
      <div className="flex items-center gap-3">
        
        {/* Dynamic theme glow color customizer indicator */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-white transition-all"
            title="Custom Glow Theme"
          >
            <Sparkles className="w-4 h-4 animate-pulse" style={{ color: themeColor }} />
          </button>

          {showColorPicker && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowColorPicker(false)} />
              <div className="absolute right-0 mt-2.5 w-48 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl p-3 shadow-2xl z-30 animate-scale-up">
                <p className="text-[9px] uppercase font-mono text-slate-500 tracking-wider mb-2 pl-1">Theme Cyber Glow</p>
                <div className="space-y-1.5">
                  {glowColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        onChangeThemeColor(color.value)
                        setShowColorPicker(false)
                        addToast('Theme Modified', `Engine glow initialized to ${color.name}.`, 'success')
                      }}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-white/5 transition-all text-left"
                    >
                      <div className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: color.value }} />
                      <span className="font-mono">{color.name}</span>
                      {themeColor === color.value && (
                        <div className="ml-auto w-1 h-1 rounded-full bg-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Light/Dark Mode Switcher */}
        <button
          onClick={onToggleDarkMode}
          className="flex items-center justify-center p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-white transition-all"
          title={isDarkMode ? 'Initialize Solar Mode' : 'Initialize Deep Space Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* System Alert Dispatch Center notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowBellDropdown(!showBellDropdown)
              if (!showBellDropdown) {
                // Dim the notification bell indicator
              }
            }}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-white transition-all relative"
            title="System Alert Dispatch"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 glow-rose animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 glow-rose" />
          </button>

          {showBellDropdown && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowBellDropdown(false)} />
              <div className="absolute right-0 mt-2.5 w-72 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl p-4 shadow-2xl z-30 animate-scale-up">
                <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-white/5">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                    Secure Signals
                  </h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    STABLE
                  </span>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="text-left">
                      <h5 className="text-[11px] font-semibold text-slate-300 mb-0.5">{alert.title}</h5>
                      <p className="text-[10px] text-slate-500 leading-normal">{alert.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Identity Badge */}
        {user && (
          <div 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-700/50 hover:bg-slate-800 transition-all cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#8B5CF6]/30 to-[#06B6D4]/30 border border-[#8B5CF6]/30 flex items-center justify-center font-bold text-[10px] uppercase font-mono text-white">
              {user.name.charAt(0)}
            </div>
            <span className="text-[11px] font-medium text-slate-200 hidden sm:inline">{user.name.split(' ')[0]}</span>
          </div>
        )}

      </div>

    </header>
  )
}
