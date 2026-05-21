import React, { useState, useEffect } from 'react'
import { 
  solveQuadratic, 
  SolveResult 
} from '../utils/solver'
import ParabolaGraph from '../components/ParabolaGraph'
import { 
  Calculator, 
  HelpCircle, 
  Download, 
  Sparkles, 
  Plus, 
  Minus, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  CheckCircle,
  FileDown,
  LineChart
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

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

interface SolverProps {
  initialA: number
  initialB: number
  initialC: number
  onSaveHistory: (item: EquationHistoryItem) => void
  addToast: (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning') => void
  themeColor: string
}

export default function Solver({
  initialA,
  initialB,
  initialC,
  onSaveHistory,
  addToast,
  themeColor
}: SolverProps) {
  // Coefficient inputs
  const [aStr, setAStr] = useState(initialA.toString())
  const [bStr, setBStr] = useState(initialB.toString())
  const [cStr, setCStr] = useState(initialC.toString())

  const [a, setA] = useState(initialA)
  const [b, setB] = useState(initialB)
  const [c, setC] = useState(initialC)

  const [solution, setSolution] = useState<SolveResult | null>(null)
  const [isSolving, setIsSolving] = useState(false)
  const [showGraph, setShowGraph] = useState(true)

  // Real-time coefficients calculation sync
  useEffect(() => {
    const valA = parseFloat(aStr)
    const valB = parseFloat(bStr)
    const valC = parseFloat(cStr)

    if (isNaN(valA) || isNaN(valB) || isNaN(valC)) {
      setSolution(null)
      return
    }

    if (valA === 0) {
      setSolution(null)
      return
    }

    setA(valA)
    setB(valB)
    setC(valC)

    const result = solveQuadratic(valA, valB, valC)
    setSolution(result)
  }, [aStr, bStr, cStr])

  // Trigger solve & saving actions
  const handleSolveSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (a === 0) {
      addToast('Calculation Blocked', "The 'a' coefficient cannot be zero (otherwise it becomes a linear equation).", 'error')
      return
    }

    setIsSolving(true)
    
    setTimeout(() => {
      setIsSolving(false)
      const result = solveQuadratic(a, b, c)
      setSolution(result)

      // Save to logs
      const historyItem: EquationHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        a,
        b,
        c,
        discriminant: result.discriminant,
        roots: {
          x1: result.roots.x1,
          x2: result.roots.x2,
          type: result.roots.type
        },
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      onSaveHistory(historyItem)

      addToast('Equation Calculated', `Roots derived successfully: D = ${result.discriminant}`, 'success')

      // Celebrate if distinct real roots are found!
      if (result.discriminant >= 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#3B82F6', '#06B6D4']
        })
      }
    }, 500)
  }

  // Preset loading helpers
  const handlePresetSelect = (presetA: number, presetB: number, presetC: number) => {
    setAStr(presetA.toString())
    setBStr(presetB.toString())
    setCStr(presetC.toString())
    addToast('Preset Coefficient Applied', `Calibration loaded: a=${presetA}, b=${presetB}, c=${presetC}`, 'info')
  }

  const handleResetInputs = () => {
    setAStr('1')
    setBStr('-5')
    setCStr('6')
    addToast('Engine Reset', 'Coefficient coordinates calibrated to baseline standard.', 'info')
  }

  // Generate printable text file report
  const handleDownloadPDF = () => {
    if (!solution) return
    const textReport = `==================================================
ANTI GRAVITY MATHEMATICAL SOLUTIONS TERMINAL REPORT
==================================================
Equation: ${solution.a}x² ${solution.b >= 0 ? '+' + solution.b : solution.b}x ${solution.c >= 0 ? '+' + solution.c : solution.c} = 0
Timestamp: ${new Date().toLocaleString()}
--------------------------------------------------
COEFFICIENTS ANALYZED:
a = ${solution.a}
b = ${solution.b}
c = ${solution.c}

DISCRIMINANT DETAILS:
D = b² - 4ac = (${solution.b})² - 4(${solution.a})(${solution.c})
D = ${solution.discriminant}
Nature of Roots: ${solution.roots.type}

ROOT VALUATIONS:
Root x₁: ${solution.roots.x1}
Root x₂: ${solution.roots.x2}

PARABOLA VERTEX PARAMETERS:
Turning Vertex (h, k): (${solution.vertex.x}, ${solution.vertex.y})
Axis of Symmetry: x = ${solution.axisOfSymmetry}
y-Intercept Coordinate: (0, ${solution.yIntercept})

==================================================
STEP-BY-STEP CALCULATION Walkthrough:
${solution.steps.map((step, idx) => `
[${idx + 1}] ${step.title}
--------------------------------------------------
Explanation: ${step.explanation}
Calculation:
${step.calculation}
`).join('\n')}
==================================================
Anti Gravity Quantum Physics calculus Engine v1.0
==================================================`

    const blob = new Blob([textReport], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `solution_y_${solution.a}x2+${solution.b}x+${solution.c}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    addToast('Calculus Saved', 'Step-by-step mathematical transcript downloaded successfully.', 'success')
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto z-10 relative">
      
      {/* Top action preset header buttons */}
      <div className="flex flex-wrap gap-2 justify-between items-center bg-slate-950/20 p-3 rounded-2xl border border-white/5">
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => handlePresetSelect(1, -5, 6)}
            className="px-3 py-1.5 rounded-xl border border-white/5 bg-slate-900/60 hover:bg-slate-800 text-[11px] font-mono text-slate-300 hover:text-white transition-all"
          >
            Distinct: x²-5x+6=0
          </button>
          <button 
            onClick={() => handlePresetSelect(1, 4, 4)}
            className="px-3 py-1.5 rounded-xl border border-white/5 bg-slate-900/60 hover:bg-slate-800 text-[11px] font-mono text-slate-300 hover:text-white transition-all"
          >
            Equal: x²+4x+4=0
          </button>
          <button 
            onClick={() => handlePresetSelect(1, 2, 5)}
            className="px-3 py-1.5 rounded-xl border border-white/5 bg-slate-900/60 hover:bg-slate-800 text-[11px] font-mono text-slate-300 hover:text-white transition-all"
          >
            Complex: x²+2x+5=0
          </button>
        </div>

        <button 
          onClick={handleResetInputs}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/5 bg-slate-900/60 hover:bg-slate-800 text-[11px] font-mono text-slate-400 hover:text-white transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Values
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Coefficient Controls Panel */}
        <div className="glass-panel border border-white/5 bg-slate-950/30 rounded-3xl p-6 lg:col-span-4 space-y-6">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-violet-400" style={{ color: themeColor }} />
            Coefficients Input Console
          </h4>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSolveSubmit(e) }} className="space-y-5">
            {/* Coefficient A */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-mono text-[10px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Coefficient a (Quadratic term)</span>
                {parseFloat(aStr) === 0 && <span className="text-rose-400">Cannot be 0</span>}
              </div>
              <div className="relative flex items-center">
                <input
                  type="number"
                  step="any"
                  value={aStr}
                  onChange={(e) => setAStr(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 text-center font-mono"
                />
              </div>
            </div>

            {/* Coefficient B */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-mono text-[10px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Coefficient b (Linear term)</span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="number"
                  step="any"
                  value={bStr}
                  onChange={(e) => setBStr(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 text-center font-mono"
                />
              </div>
            </div>

            {/* Coefficient C */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-mono text-[10px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Coefficient c (Constant value)</span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="number"
                  step="any"
                  value={cStr}
                  onChange={(e) => setCStr(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 text-center font-mono"
                />
              </div>
            </div>

            {/* Display formatted preview equation */}
            <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 text-center font-mono text-xs">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Active Mathematical Vector</p>
              <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {aStr || '0'}x² 
                {parseFloat(bStr) >= 0 ? ` + ${bStr || '0'}` : ` - ${Math.abs(parseFloat(bStr) || 0)}`}x 
                {parseFloat(cStr) >= 0 ? ` + ${cStr || '0'}` : ` - ${Math.abs(parseFloat(cStr) || 0)}`} = 0
              </span>
            </div>

            {/* Calculate Button */}
            <button
              type="button"
              onClick={() => handleSolveSubmit()}
              disabled={isSolving || parseFloat(aStr) === 0}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white font-semibold text-xs hover:opacity-95 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg disabled:opacity-40"
              style={{ boxShadow: `0 4px 20px ${themeColor}35` }}
            >
              {isSolving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Solve Vector Coordinates
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Graph view & Steps details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Parabola Plot Container */}
          <div className="glass-panel border border-white/5 bg-slate-950/20 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <LineChart className="w-4 h-4 text-cyan-400" />
                Real-Time Coordinate Visualization
              </h4>
              <span className="text-[10px] font-mono text-slate-500">ZOOM WHEEL & DRAG PAN ENABLED</span>
            </div>

            {solution ? (
              <div className="h-[420px]">
                <ParabolaGraph
                  a={solution.a}
                  b={solution.b}
                  c={solution.c}
                  x1={typeof solution.roots.x1 === 'number' ? solution.roots.x1 : null}
                  x2={typeof solution.roots.x2 === 'number' ? solution.roots.x2 : null}
                  vertex={solution.vertex}
                  themeColor={themeColor}
                />
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-slate-500 animate-bounce" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Awaiting Calibration Parameters</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Please provide non-zero a coefficient coordinate values.</p>
                </div>
              </div>
            )}
          </div>

          {/* Mathematical Step-by-Step Breakdown */}
          {solution && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel border border-white/5 bg-slate-950/20 rounded-3xl p-6 space-y-6"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-violet-400" style={{ color: themeColor }} />
                    Algorithmic Step Derivation walkthrough
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    AI step explanation of the mathematical solver steps.
                  </p>
                </div>
                
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/50 hover:bg-slate-800 text-[11px] font-mono text-slate-300 hover:text-white transition-all active:scale-95 shadow-md"
                >
                  <FileDown className="w-4 h-4 text-violet-400 animate-bounce" style={{ color: themeColor }} />
                  Save Solution TXT
                </button>
              </div>

              {/* Numerical summary row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-2">
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">DISCRIMINANT (D)</span>
                  <span className="text-base font-mono font-bold text-white">{solution.discriminant}</span>
                </div>
                
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Nature of roots</span>
                  <span className="text-xs font-bold text-emerald-400 truncate block">{solution.roots.type}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Root x₁ value</span>
                  <span className="text-[11px] font-mono font-bold text-cyan-400 truncate block">{solution.roots.x1}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Root x₂ value</span>
                  <span className="text-[11px] font-mono font-bold text-cyan-400 truncate block">{solution.roots.x2}</span>
                </div>
              </div>

              {/* Derivation Steps Accordion */}
              <div className="space-y-4 pt-2">
                {solution.steps.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
                    <h5 className="text-xs font-bold text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {step.title}
                    </h5>
                    <p className="text-xs text-slate-400 leading-normal pl-6 whitespace-pre-line">{step.explanation}</p>
                    
                    {step.formula && (
                      <div className="pl-6">
                        <code className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 inline-block">
                          {step.formula}
                        </code>
                      </div>
                    )}

                    <div className="pl-6 bg-slate-900/40 border-l-2 border-[#8B5CF6]/50 p-3 rounded-r-xl font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {step.calculation}
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

        </div>

      </div>

    </div>
  )
}
