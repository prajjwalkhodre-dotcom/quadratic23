import React, { useState } from 'react'
import { Mail, Lock, User, ArrowLeft, ArrowRight, Github, Chrome, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface SignupProps {
  onNavigate: (page: string) => void
  onSignupSuccess: (email: string, name: string) => void
  addToast: (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning') => void
  themeColor: string
}

export default function Signup({ onNavigate, onSignupSuccess, addToast, themeColor }: SignupProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()

    // Valdations
    if (!name) {
      addToast('Validation Error', 'Full Name is required.', 'error')
      return
    }
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
    if (password !== confirmPassword) {
      addToast('Validation Error', 'Passwords do not match.', 'error')
      return
    }
    if (!agreeTerms) {
      addToast('Validation Error', 'You must agree to the cybernetic terms of service.', 'warning')
      return
    }

    setIsLoading(true)

    // Simulate signup request delay
    setTimeout(() => {
      setIsLoading(false)
      addToast('Credentials Formed', `Cadet registry verified successfully!`, 'success')
      onSignupSuccess(email, name)
    }, 1200)
  }

  const handleSocialSignup = (platform: string) => {
    addToast('Social Sync', `Syncing credentials with ${platform}...`, 'info')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      addToast('Credentials Formed', `Synchronized profile with ${platform}`, 'success')
      onSignupSuccess(
        platform === 'Google' ? 'prajjwal.google@gmail.com' : 'prajjwal.dev@github.com',
        platform === 'Google' ? 'Prajjwal Google' : 'Prajjwal Github'
      )
    }, 1000)
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
        <div className="text-center mb-6">
          <div 
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-lg font-bold text-xl text-white mx-auto mb-4"
            style={{ boxShadow: `0 0 25px ${themeColor}40` }}
          >
            AG
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Create Cadet Credentials</h2>
          <p className="text-slate-400 text-xs mt-1">Register for premium AI modeling workspace</p>
        </div>

        {/* Signup Card Panel */}
        <div className="glass-panel border border-white/5 rounded-3xl p-8 bg-slate-950/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent" />

          <form onSubmit={handleSignup} className="space-y-4.5">
            
            {/* Name Field */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 uppercase tracking-wider">Full Identification Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Prajjwal Khodre"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm font-sans"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 uppercase tracking-wider">Secure Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm font-sans"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 uppercase tracking-wider">Formulate Cryptopassword</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm font-sans"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 uppercase tracking-wider">Verify Cryptopassword</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm font-sans"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <button
                type="button"
                onClick={() => setAgreeTerms(!agreeTerms)}
                className="flex items-start gap-2 text-[11px] text-slate-400 hover:text-slate-200 transition-colors select-none text-left font-mono"
              >
                <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all mt-0.5 flex-shrink-0 ${agreeTerms ? 'bg-cyan-600 border-cyan-500 text-white' : 'border-slate-700 bg-slate-900/40'}`}>
                  {agreeTerms && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>
                  I accept the gravity protocol and digital computing agreements.
                </span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-semibold text-sm hover:opacity-95 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg disabled:opacity-50"
              style={{ boxShadow: `0 4px 20px ${themeColor}35` }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Establish Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-5 pt-5 border-t border-slate-800/80">
            <p className="text-center text-[10px] uppercase font-mono text-slate-500 tracking-wider mb-3">Or quick register via sync</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialSignup('Google')}
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all font-mono text-xs text-slate-300 hover:text-white"
              >
                <Chrome className="w-3.5 h-3.5 text-rose-500" />
                Google
              </button>
              <button
                onClick={() => handleSocialSignup('GitHub')}
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all font-mono text-xs text-slate-300 hover:text-white"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Redirect Link */}
        <p className="text-center text-xs text-slate-500 mt-6 font-mono">
          Already verified?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-violet-400 hover:text-violet-300 font-semibold hover:underline"
          >
            Authenticate Key
          </button>
        </p>
      </motion.div>
      
    </div>
  )
}
