import React, { useState } from 'react'
import { Mail, Lock, ArrowLeft, ArrowRight, Github, Chrome, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface LoginProps {
  onNavigate: (page: string) => void
  onLoginSuccess: (email: string) => void
  addToast: (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning') => void
  themeColor: string
}

export default function Login({ onNavigate, onLoginSuccess, addToast, themeColor }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple robust form validations
    if (!email) {
      addToast('Validation Error', 'Email address is required.', 'error')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      addToast('Validation Error', 'Please enter a valid email address.', 'error')
      return
    }
    if (!password) {
      addToast('Validation Error', 'Password is required.', 'error')
      return
    }
    if (password.length < 6) {
      addToast('Validation Error', 'Password must be at least 6 characters.', 'error')
      return
    }

    setIsLoading(true)

    // Simulate server side authentication delay
    setTimeout(() => {
      setIsLoading(false)
      addToast('Authentication Verified', `Welcome back to Anti Gravity!`, 'success')
      onLoginSuccess(email)
    }, 1200)
  }

  const handleSocialLogin = (platform: string) => {
    addToast('Social Authenticator', `Syncing session keys with ${platform}...`, 'info')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      addToast('Authentication Verified', `Authorized via ${platform}`, 'success')
      onLoginSuccess(platform === 'Google' ? 'prajjwal.google@gmail.com' : 'prajjwal.dev@github.com')
    }, 1000)
  }

  const handleForgotPassword = () => {
    if (!email) {
      addToast('Action Required', 'Please fill in your email address first to reset your password.', 'warning')
      return
    }
    addToast('Password Reset Dispatched', `A secure reset token has been transmitted to ${email}.`, 'success')
  }

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
      
      {/* Return button */}
      <button
        onClick={() => onNavigate('landing')}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-all bg-slate-800/40 border border-slate-700/50 px-3.5 py-2 rounded-xl glass-panel active:scale-95 z-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Orbit
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo and Headings */}
        <div className="text-center mb-8">
          <div 
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-lg font-bold text-xl text-white mx-auto mb-4"
            style={{ boxShadow: `0 0 25px ${themeColor}40` }}
          >
            AG
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Access Anti Gravity Terminal</h2>
          <p className="text-slate-400 text-xs mt-1">Unlock AI Quadratic modeling capability</p>
        </div>

        {/* Login Card Panel */}
        <div className="glass-panel border border-white/5 rounded-3xl p-8 bg-slate-950/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">Secure Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm font-sans"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">Access Cryptopassword</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                >
                  Forgot key?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm font-sans"
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors select-none font-mono"
              >
                <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-violet-600 border-violet-500 text-white' : 'border-slate-700 bg-slate-900/40'}`}>
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                Remember active session
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-95 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg disabled:opacity-50"
              style={{ boxShadow: `0 4px 20px ${themeColor}35` }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate Terminal
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <p className="text-center text-[10px] uppercase font-mono text-slate-500 tracking-wider mb-4">Or Quick Sync Identity</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all font-mono text-xs text-slate-300 hover:text-white"
              >
                <Chrome className="w-3.5 h-3.5 text-rose-500" />
                Google
              </button>
              <button
                onClick={() => handleSocialLogin('GitHub')}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all font-mono text-xs text-slate-300 hover:text-white"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Redirect Link */}
        <p className="text-center text-xs text-slate-500 mt-6 font-mono">
          New Cadet?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline"
          >
            Create Credentials
          </button>
        </p>
      </motion.div>
      
    </div>
  )
}
