import React, { useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export interface Toast {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface NotificationProps {
  toasts: Toast[]
  onClose: (id: string) => void
}

export default function Notification({ toasts, onClose }: NotificationProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          const typeConfig = {
            success: {
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
              borderColor: 'border-emerald-500/30',
              glowColor: 'shadow-emerald-500/10',
              textColor: 'text-emerald-400',
              bgGradient: 'from-emerald-950/20 to-slate-900/90'
            },
            error: {
              icon: <AlertCircle className="w-5 h-5 text-rose-400" />,
              borderColor: 'border-rose-500/30',
              glowColor: 'shadow-rose-500/10',
              textColor: 'text-rose-400',
              bgGradient: 'from-rose-950/20 to-slate-900/90'
            },
            warning: {
              icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
              borderColor: 'border-amber-500/30',
              glowColor: 'shadow-amber-500/10',
              textColor: 'text-amber-400',
              bgGradient: 'from-amber-950/20 to-slate-900/90'
            },
            info: {
              icon: <Info className="w-5 h-5 text-cyan-400" />,
              borderColor: 'border-cyan-500/30',
              glowColor: 'shadow-cyan-500/10',
              textColor: 'text-cyan-400',
              bgGradient: 'from-cyan-950/20 to-slate-900/90'
            }
          }[toast.type]

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`glass-panel border ${typeConfig.borderColor} bg-gradient-to-r ${typeConfig.bgGradient} rounded-2xl p-4 shadow-xl ${typeConfig.glowColor} flex gap-3 items-start pointer-events-auto relative overflow-hidden`}
            >
              {/* Top border glowing highlight line */}
              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent ${typeConfig.textColor}`} />

              <div className="flex-shrink-0 mt-0.5">{typeConfig.icon}</div>
              <div className="flex-grow min-w-0 pr-4">
                <h4 className={`font-semibold text-sm ${typeConfig.textColor} leading-tight mb-1`}>
                  {toast.title}
                </h4>
                <p className="text-slate-300 text-xs leading-normal">{toast.message}</p>
              </div>
              <button
                onClick={() => onClose(toast.id)}
                className="flex-shrink-0 text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded-lg hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
