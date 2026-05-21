import React from 'react'
import { LayoutDashboard, Calculator, LineChart, User, Settings, LogOut, Cpu, Compass, BookOpen } from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  onLogout: () => void
  user: { name: string; email: string } | null
  themeColor: string
}

export default function Sidebar({ currentPage, onNavigate, onLogout, user, themeColor }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Terminal HUD', icon: LayoutDashboard, shortcut: 'D' },
    { id: 'solver', label: 'Equation Solver', icon: Calculator, shortcut: 'S' },
    { id: 'graph', label: 'Graph Analysis', icon: LineChart, shortcut: 'G' },
    { id: 'profile', label: 'Cadet Identity', icon: User, shortcut: 'P' },
    { id: 'settings', label: 'Engine Options', icon: Settings, shortcut: 'O' }
  ]

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-slate-950/40 backdrop-blur-xl flex flex-col justify-between p-6 z-10">
      
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div 
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg text-sm"
            style={{ boxShadow: `0 0 15px ${themeColor}40` }}
          >
            AG
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-1 leading-tight">
              Anti Gravity
            </h2>
            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest leading-none">Mathematics Engine</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1.5">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-3 mb-3">Core Workspace</p>
          
          {menuItems.map((item) => {
            const IconComponent = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-sans text-xs group select-none active:scale-[0.98] ${
                  isActive
                    ? 'bg-white/5 border border-white/10 text-white font-medium shadow-md shadow-black/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent 
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`} 
                    style={isActive ? { color: themeColor } : {}}
                  />
                  <span>{item.label}</span>
                </div>
                
                {/* Keyboard Shortcut Indicator */}
                <span className="kbd-key opacity-40 group-hover:opacity-80 transition-opacity">
                  {item.shortcut}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Profile summary & Logout trigger */}
      <div>
        {user && (
          <div className="p-3 bg-white/3 border border-white/5 rounded-2xl mb-4 flex items-center gap-3">
            {/* Minimal Avatar */}
            <div 
              className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600/30 to-cyan-400/30 border border-violet-500/30 text-white flex items-center justify-center font-bold text-xs uppercase font-mono"
            >
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-grow">
              <h4 className="text-xs font-semibold text-slate-200 truncate">{user.name}</h4>
              <p className="text-[10px] text-slate-500 font-mono truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* System Documentation link & Exit button */}
        <div className="space-y-1.5">
          <button
            onClick={() => onNavigate('landing')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs hover:bg-white/2 transition-all font-mono"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            Launchpad
          </button>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 text-xs transition-all font-mono group"
          >
            <LogOut className="w-4 h-4 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
            Disconnect
          </button>
        </div>
      </div>

    </aside>
  )
}
