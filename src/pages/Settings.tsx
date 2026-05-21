import React, { useState } from 'react'
import { Settings, ShieldAlert, Sparkles, RefreshCw, KeyRound, Check } from 'lucide-react'

interface SettingsProps {
  themeColor: string
  onChangeThemeColor: (color: string) => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
  onClearHistory: () => void
  addToast: (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning') => void
}

export default function SettingsPage({
  themeColor,
  onChangeThemeColor,
  isDarkMode,
  onToggleDarkMode,
  onClearHistory,
  addToast
}: SettingsProps) {
  const [precision, setPrecision] = useState(4)
  const [showGrid, setShowGrid] = useState(true)

  const glowColors = [
    { value: '#8B5CF6', name: 'Purple Nebula' },
    { value: '#3B82F6', name: 'Cyber Blue' },
    { value: '#06B6D4', name: 'Neon Cyan' },
    { value: '#10B981', name: 'Emerald Laser' },
    { value: '#EC4899', name: 'Pink Singularity' }
  ]

  const handleFactoryReset = () => {
    onClearHistory()
    addToast('System Factory Reset', 'All cached calculations and settings have been purged.', 'warning')
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto z-10 relative">
      
      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core Engine Variables panel */}
        <div className="glass-panel border border-white/5 bg-slate-950/20 rounded-3xl p-6 space-y-5">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2.5 border-b border-white/5">
            <Settings className="w-4 h-4 text-violet-400" style={{ color: themeColor }} />
            Calculus Processor parameters
          </h4>

          {/* Precision Decimal slider */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Numerical float Precision</span>
              <span className="text-slate-300 font-bold">{precision} Decimals</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={precision}
              onChange={(e) => {
                setPrecision(parseInt(e.target.value))
                addToast('Precision Updated', `Engine decimal rounding configured to ${e.target.value} places.`, 'success')
              }}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
            />
            <p className="text-[10px] text-slate-500 font-light">
              Sets decimal rounding limits for calculated discriminant, vertex roots, and focus coordinates.
            </p>
          </div>

          {/* Show grid lines switch */}
          <div className="flex justify-between items-center pt-2">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-slate-200 block">Show Cartesian grid lines</span>
              <span className="text-[10px] text-slate-500 font-light block">Display full axis grids on interactive plots</span>
            </div>
            <button
              onClick={() => {
                setShowGrid(!showGrid)
                addToast('Graph Grid Toggle', `Cartesian grid lines ${!showGrid ? 'enabled' : 'disabled'} on plot.`, 'info')
              }}
              className={`w-11 h-6 rounded-full transition-all relative flex items-center p-0.5 ${showGrid ? 'bg-violet-600' : 'bg-slate-800 border border-slate-700'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${showGrid ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Global theme customized options */}
        <div className="glass-panel border border-white/5 bg-slate-950/20 rounded-3xl p-6 space-y-5">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2.5 border-b border-white/5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Global Visual configuration
          </h4>

          {/* Light/Dark Toggle row */}
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-slate-200 block">Dark / Light Engine Theme</span>
              <span className="text-[10px] text-slate-500 font-light block">Toggle between Deep Space and Solar UI mode</span>
            </div>
            
            <button
              onClick={() => {
                onToggleDarkMode()
                addToast('System Theme Toggled', `Engine visual interface modified.`, 'info')
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/50 hover:bg-slate-800 text-[11px] font-mono text-slate-300 hover:text-white transition-all active:scale-95"
            >
              {isDarkMode ? 'Lunar Deep Space' : 'Solar Light UI'}
            </button>
          </div>

          {/* Color pickers */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Active Terminal Glow Color</span>
            <div className="flex gap-2 flex-wrap">
              {glowColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    onChangeThemeColor(color.value)
                    addToast('Theme Modified', `Engine glow initialized to ${color.name}.`, 'success')
                  }}
                  className="w-8 h-8 rounded-xl border border-white/5 flex items-center justify-center transition-all hover:scale-110 active:scale-95 relative"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {themeColor === color.value && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Keyboard shortcuts & Factory actions row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keyboard Shortcuts Panel */}
        <div className="glass-panel border border-white/5 bg-slate-950/20 rounded-3xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2.5 border-b border-white/5">
            <KeyRound className="w-4 h-4 text-cyan-400" />
            Active Terminal Shortcuts keys
          </h4>
          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Terminal HUD page:</span>
              <kbd className="kbd-key bg-slate-900 border border-white/10 text-[10px] font-bold">D</kbd>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Equation Solver tool:</span>
              <kbd className="kbd-key bg-slate-900 border border-white/10 text-[10px] font-bold">S</kbd>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Graph Plot grid:</span>
              <kbd className="kbd-key bg-slate-900 border border-white/10 text-[10px] font-bold">G</kbd>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Cadet Profile badge:</span>
              <kbd className="kbd-key bg-slate-900 border border-white/10 text-[10px] font-bold">P</kbd>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Engine Settings configuration:</span>
              <kbd className="kbd-key bg-slate-900 border border-white/10 text-[10px] font-bold">O</kbd>
            </div>
          </div>
        </div>

        {/* Security Reset Actions panel */}
        <div className="glass-panel border border-white/5 bg-slate-950/20 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2.5 border-b border-white/5">
              <ShieldAlert className="w-4.5 h-4.5 text-rose-500" />
              Security Reset Actions
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Caution: Initializing a database purging factory reset will erase all equation logs cache from standard buffers.
            </p>
          </div>

          <button
            onClick={handleFactoryReset}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all text-xs font-mono font-semibold text-rose-400 active:scale-95 group"
          >
            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
            Purge Cached Memory buffers
          </button>
        </div>
      </div>

    </div>
  )
}
