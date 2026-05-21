import React, { useState } from 'react'
import ParabolaGraph from '../components/ParabolaGraph'
import { solveQuadratic } from '../utils/solver'
import { LineChart, Sparkles, Sliders, Info, HelpCircle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

interface GraphAnalysisProps {
  a: number
  b: number
  c: number
  onLoadEquation: (a: number, b: number, c: number) => void
  themeColor: string
}

export default function GraphAnalysis({ a, b, c, onLoadEquation, themeColor }: GraphAnalysisProps) {
  // Graph parameters state
  const [aStr, setAStr] = useState(a.toString())
  const [bStr, setBStr] = useState(b.toString())
  const [cStr, setCStr] = useState(c.toString())

  const valA = parseFloat(aStr) || 1
  const valB = parseFloat(bStr) || 0
  const valC = parseFloat(cStr) || 0

  const solution = solveQuadratic(valA, valB, valC)

  // Focus and Directrix calculations
  // For standard parabola y = ax^2 + bx + c:
  // Focus is at (h, k + 1/(4a)) where h = -b/(2a), k = -D/(4a)
  // Directrix is horizontal line y = k - 1/(4a)
  const focusX = solution.vertex.x
  const focusY = solution.vertex.y + 1 / (4 * valA)
  const directrixY = solution.vertex.y - 1 / (4 * valA)

  const handleSliderChange = (type: 'a' | 'b' | 'c', val: number) => {
    const rounded = Number(val.toFixed(1))
    if (type === 'a') {
      if (rounded === 0) return // a cannot be 0
      setAStr(rounded.toString())
    } else if (type === 'b') {
      setBStr(rounded.toString())
    } else {
      setCStr(rounded.toString())
    }
    onLoadEquation(type === 'a' ? rounded : valA, type === 'b' ? rounded : valB, type === 'c' ? rounded : valC)
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto z-10 relative">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side sliders panel */}
        <div className="glass-panel border border-white/5 bg-slate-950/30 rounded-3xl p-6 lg:col-span-4 space-y-6">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Coefficient Fine-Tuning
          </h4>
          <p className="text-slate-400 text-xs">
            Interact with the sliders below to adjust coefficients in real-time and observe immediate transformations.
          </p>

          <div className="space-y-6 pt-2">
            {/* Slider A */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Coefficient a ({valA})</span>
                <span className="text-slate-500">Concavity</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={valA}
                onChange={(e) => handleSliderChange('a', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>Downward (-5)</span>
                <span>Narrow (5)</span>
              </div>
            </div>

            {/* Slider B */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Coefficient b ({valB})</span>
                <span className="text-slate-500">Horizontal shift</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.2"
                value={valB}
                onChange={(e) => handleSliderChange('b', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>Left Shift (-10)</span>
                <span>Right Shift (10)</span>
              </div>
            </div>

            {/* Slider C */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Coefficient c ({valC})</span>
                <span className="text-slate-500">y-Intercept</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.2"
                value={valC}
                onChange={(e) => handleSliderChange('c', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>Down (-10)</span>
                <span>Up (10)</span>
              </div>
            </div>

          </div>

          {/* Mathematical variables info cards */}
          <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 space-y-3 font-mono text-[11px]">
            <h5 className="font-bold text-white uppercase tracking-wider pb-1.5 border-b border-white/5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              Parabola Metrics
            </h5>
            
            <div className="flex justify-between">
              <span className="text-slate-500">Focal focus F:</span>
              <span className="text-slate-300 font-semibold">({focusX.toFixed(2)}, {focusY.toFixed(2)})</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-500">Directrix line:</span>
              <span className="text-slate-300 font-semibold">y = {directrixY.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Aperture width:</span>
              <span className="text-slate-300 font-semibold">{Number(Math.abs(1 / valA).toFixed(2))}</span>
            </div>
          </div>

        </div>

        {/* Right Side Graph plot */}
        <div className="lg:col-span-8 glass-panel border border-white/5 bg-slate-950/20 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <LineChart className="w-4 h-4 text-cyan-400" />
              Advanced Graph workspace
            </h4>
            <span className="text-[10px] font-mono text-slate-500">SCROLL TO ZOOM / DRAG MOUSE TO PAN</span>
          </div>

          <div className="h-[460px]">
            <ParabolaGraph
              a={valA}
              b={valB}
              c={valC}
              x1={typeof solution.roots.x1 === 'number' ? solution.roots.x1 : null}
              x2={typeof solution.roots.x2 === 'number' ? solution.roots.x2 : null}
              vertex={solution.vertex}
              themeColor={themeColor}
            />
          </div>
        </div>

      </div>

    </div>
  )
}
