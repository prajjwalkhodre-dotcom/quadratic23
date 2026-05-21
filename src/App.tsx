import React, { useState, useEffect } from 'react'
import GlowingBlobs from './components/GlowingBlobs'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Notification, { Toast } from './components/Notification'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Solver from './pages/Solver'
import GraphAnalysis from './pages/GraphAnalysis'
import Profile from './pages/Profile'
import SettingsPage from './pages/Settings'

interface UserState {
  email: string
  name: string
}

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

export default function App() {
  // Navigation
  const [currentPage, setCurrentPage] = useState<string>('landing')

  // Auth User state
  const [user, setUser] = useState<UserState | null>(() => {
    const savedUser = localStorage.getItem('ag_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Solver values state
  const [solverCoeffs, setSolverCoeffs] = useState({ a: 1, b: -5, c: 6 })

  // History state
  const [history, setHistory] = useState<EquationHistoryItem[]>(() => {
    const saved = localStorage.getItem('ag_history')
    return saved ? JSON.parse(saved) : []
  })

  // Theme settings state
  const [themeColor, setThemeColor] = useState<string>(() => {
    return localStorage.getItem('ag_theme') || '#8B5CF6'
  })
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

  // Notification Toast state
  const [toasts, setToasts] = useState<Toast[]>([])

  // Load user session on boot up
  useEffect(() => {
    if (user && currentPage === 'landing') {
      setCurrentPage('dashboard')
    }
  }, [user])

  // Save history state to local storage
  useEffect(() => {
    localStorage.setItem('ag_history', JSON.stringify(history))
  }, [history])

  // Key navigation binding helper
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if user is actively writing input coefficients
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return
      }

      if (e.key.toLowerCase() === 'd') {
        if (user) {
          setCurrentPage('dashboard')
          addToast('HUD Navigation', 'Terminal HUD opened.', 'info')
        }
      } else if (e.key.toLowerCase() === 's') {
        if (user) {
          setCurrentPage('solver')
          addToast('Terminal Solver', 'Equation Solver Module activated.', 'info')
        }
      } else if (e.key.toLowerCase() === 'g') {
        if (user) {
          setCurrentPage('graph')
          addToast('Workspace Graph', 'Coordinate Analysis view rendered.', 'info')
        }
      } else if (e.key.toLowerCase() === 'p') {
        if (user) {
          setCurrentPage('profile')
          addToast('Identity Registry', 'Cadet credentials loaded.', 'info')
        }
      } else if (e.key.toLowerCase() === 'o') {
        if (user) {
          setCurrentPage('settings')
          addToast('Engine Config', 'Calibration parameters panel loaded.', 'info')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [user])

  // Toast notifier helper
  const addToast = (title: string, message: string, type: Toast['type']) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, message, type }])
    
    // Auto-remove Toast after 4 seconds
    setTimeout(() => {
      removeToast(id)
    }, 4000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  // Handle Auth Session Success triggers
  const handleLoginSuccess = (email: string) => {
    const mockUser = {
      email,
      name: email.split('@')[0].split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }
    setUser(mockUser)
    localStorage.setItem('ag_user', JSON.stringify(mockUser))
    setCurrentPage('dashboard')
  }

  const handleSignupSuccess = (email: string, name: string) => {
    const mockUser = { email, name }
    setUser(mockUser)
    localStorage.setItem('ag_user', JSON.stringify(mockUser))
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('ag_user')
    setCurrentPage('landing')
    addToast('Cadet Dismissed', 'Session terminated. Cadet credentials disconnected.', 'warning')
  }

  // Equation loader sync
  const handleLoadEquationIntoSolver = (a: number, b: number, c: number) => {
    setSolverCoeffs({ a, b, c })
  }

  const handleClearHistory = () => {
    setHistory([])
    localStorage.removeItem('ag_history')
  }

  const handleThemeColorChange = (color: string) => {
    setThemeColor(color)
    localStorage.setItem('ag_theme', color)
  }

  // Render Page selector
  const renderActiveView = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={setCurrentPage} themeColor={themeColor} />
      case 'login':
        return (
          <Login
            onNavigate={setCurrentPage}
            onLoginSuccess={handleLoginSuccess}
            addToast={addToast}
            themeColor={themeColor}
          />
        )
      case 'signup':
        return (
          <Signup
            onNavigate={setCurrentPage}
            onSignupSuccess={handleSignupSuccess}
            addToast={addToast}
            themeColor={themeColor}
          />
        )
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            onNavigate={setCurrentPage}
            history={history}
            onClearHistory={handleClearHistory}
            onLoadEquation={handleLoadEquationIntoSolver}
            addToast={addToast}
            themeColor={themeColor}
          />
        )
      case 'solver':
        return (
          <Solver
            initialA={solverCoeffs.a}
            initialB={solverCoeffs.b}
            initialC={solverCoeffs.c}
            onSaveHistory={(item) => setHistory((prev) => [item, ...prev])}
            addToast={addToast}
            themeColor={themeColor}
          />
        )
      case 'graph':
        return (
          <GraphAnalysis
            a={solverCoeffs.a}
            b={solverCoeffs.b}
            c={solverCoeffs.c}
            onLoadEquation={handleLoadEquationIntoSolver}
            themeColor={themeColor}
          />
        )
      case 'profile':
        return <Profile user={user} historyLength={history.length} themeColor={themeColor} />
      case 'settings':
        return (
          <SettingsPage
            themeColor={themeColor}
            onChangeThemeColor={handleThemeColorChange}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onClearHistory={handleClearHistory}
            addToast={addToast}
          />
        )
      default:
        return <Landing onNavigate={setCurrentPage} themeColor={themeColor} />
    }
  }

  const isAuthPage = ['landing', 'login', 'signup'].includes(currentPage)

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'dark' : ''} bg-[#0F172A] overflow-hidden font-sans`}>
      {/* Background Floating Blobs and Grid dots */}
      <GlowingBlobs />

      {/* Structured core dashboard shell layout */}
      <div className="flex h-screen w-screen overflow-hidden relative z-10">
        
        {/* Render Sidebar only inside workspace views */}
        {!isAuthPage && user && (
          <Sidebar
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            user={user}
            themeColor={themeColor}
          />
        )}

        {/* Content Section */}
        <div className="flex-grow flex flex-col min-w-0 overflow-y-auto h-full">
          {/* Render top navbar only inside workspace views */}
          {!isAuthPage && user && (
            <Navbar
              currentPage={currentPage}
              user={user}
              themeColor={themeColor}
              onChangeThemeColor={handleThemeColorChange}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              addToast={addToast}
              onNavigate={setCurrentPage}
            />
          )}

          <div className="flex-grow">
            {renderActiveView()}
          </div>
        </div>

      </div>

      {/* Global Toast Notifications dispatcher */}
      <Notification toasts={toasts} onClose={removeToast} />
    </div>
  )
}
