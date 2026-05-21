import React, { useState, useEffect, useRef } from 'react'
import { ZoomIn, ZoomOut, RotateCcw, Crosshair, ArrowRight, Download } from 'lucide-react'

interface ParabolaGraphProps {
  a: number
  b: number
  c: number
  x1: number | null
  x2: number | null
  vertex: { x: number; y: number }
  themeColor?: string // Hex color for customized theme
}

export default function ParabolaGraph({ a, b, c, x1, x2, vertex, themeColor = '#8B5CF6' }: ParabolaGraphProps) {
  // Graph viewport limits (cartesian coordinate bounds)
  const [bounds, setBounds] = useState({
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10,
  })

  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; label: string } | null>(null)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement | null>(null)

  // Auto-center viewport on the vertex and roots when coefficients change
  useEffect(() => {
    // Determine target center
    const targetX = vertex.x
    const targetY = vertex.y

    // Set reasonable zoom range around the vertex
    let spread = 8
    if (x1 !== null && x2 !== null) {
      spread = Math.max(Math.abs(x1 - x2) * 1.5, 6)
    }

    setBounds({
      xMin: targetX - spread,
      xMax: targetX + spread,
      yMin: targetY - spread,
      yMax: targetY + spread,
    })
  }, [a, b, c, vertex.x, vertex.y])

  // Conversion: Cartesian to SVG Pixels
  const svgWidth = 600
  const svgHeight = 400

  const toSvgX = (x: number) => {
    return ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * svgWidth
  }

  const toSvgY = (y: number) => {
    // Invert Y axis for standard math coordinates (positive up)
    return svgHeight - ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * svgHeight
  }

  // Conversion: SVG Pixels to Cartesian
  const toCartesianX = (svgX: number) => {
    return bounds.xMin + (svgX / svgWidth) * (bounds.xMax - bounds.xMin)
  }

  const toCartesianY = (svgY: number) => {
    return bounds.yMin + ((svgHeight - svgY) / svgHeight) * (bounds.yMax - bounds.yMin)
  }

  // Generate Parabola Path Points
  const getParabolaPath = () => {
    const points: string[] = []
    const stepCount = 150
    const stepSize = (bounds.xMax - bounds.xMin) / stepCount

    for (let i = -10; i <= stepCount + 10; i++) {
      const x = bounds.xMin + i * stepSize
      const y = a * x * x + b * x + c
      
      // Prevent rendering extreme infinite values
      if (Math.abs(y) < 1000) {
        const sx = toSvgX(x)
        const sy = toSvgY(y)
        if (i === -10) {
          points.push(`M ${sx} ${sy}`)
        } else {
          points.push(`L ${sx} ${sy}`)
        }
      }
    }
    return points.join(' ')
  }

  // Generate Grid lines (Integers)
  const getGridLines = () => {
    const xLines: React.ReactNode[] = []
    const yLines: React.ReactNode[] = []

    // Calculate dynamic step based on viewport size
    const rangeX = bounds.xMax - bounds.xMin
    let step = 1
    if (rangeX > 40) step = 5
    if (rangeX > 100) step = 10
    if (rangeX > 200) step = 25
    if (rangeX < 5) step = 0.5
    if (rangeX < 2) step = 0.1

    const firstX = Math.ceil(bounds.xMin / step) * step
    const lastX = Math.floor(bounds.xMax / step) * step

    for (let x = firstX; x <= lastX; x = Number((x + step).toFixed(2))) {
      const sx = toSvgX(x)
      const isOrigin = Math.abs(x) < 0.0001
      xLines.push(
        <g key={`x-${x}`}>
          <line
            x1={sx}
            y1={0}
            x2={sx}
            y2={svgHeight}
            stroke={isOrigin ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)'}
            strokeWidth={isOrigin ? 1.5 : 0.5}
          />
          {!isOrigin && (
            <text
              x={sx}
              y={toSvgY(0) + 15 > svgHeight - 5 ? svgHeight - 5 : toSvgY(0) + 15 < 15 ? 15 : toSvgY(0) + 15}
              fill="rgba(255, 255, 255, 0.4)"
              fontSize="9"
              textAnchor="middle"
              className="user-select-none font-mono"
            >
              {x}
            </text>
          )}
        </g>
      )
    }

    const firstY = Math.ceil(bounds.yMin / step) * step
    const lastY = Math.floor(bounds.yMax / step) * step

    for (let y = firstY; y <= lastY; y = Number((y + step).toFixed(2))) {
      const sy = toSvgY(y)
      const isOrigin = Math.abs(y) < 0.0001
      yLines.push(
        <g key={`y-${y}`}>
          <line
            x1={0}
            y1={sy}
            x2={svgWidth}
            y2={sy}
            stroke={isOrigin ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)'}
            strokeWidth={isOrigin ? 1.5 : 0.5}
          />
          {!isOrigin && (
            <text
              x={toSvgX(0) - 15 < 5 ? 5 : toSvgX(0) - 15 > svgWidth - 25 ? svgWidth - 25 : toSvgX(0) - 15}
              y={sy + 3}
              fill="rgba(255, 255, 255, 0.4)"
              fontSize="9"
              textAnchor="end"
              className="user-select-none font-mono"
            >
              {y}
            </text>
          )}
        </g>
      )
    }

    return { xLines, yLines }
  }

  // Handle Zoom Actions
  const handleZoom = (factor: number) => {
    const rangeX = bounds.xMax - bounds.xMin
    const rangeY = bounds.yMax - bounds.yMin
    const centerX = (bounds.xMax + bounds.xMin) / 2
    const centerY = (bounds.yMax + bounds.yMin) / 2

    const newHalfRangeX = (rangeX * factor) / 2
    const newHalfRangeY = (rangeY * factor) / 2

    setBounds({
      xMin: centerX - newHalfRangeX,
      xMax: centerX + newHalfRangeX,
      yMin: centerY - newHalfRangeY,
      yMax: centerY + newHalfRangeY,
    })
  }

  const handleReset = () => {
    setBounds({
      xMin: vertex.x - 8,
      xMax: vertex.x + 8,
      yMin: vertex.y - 8,
      yMax: vertex.y + 8,
    })
  }

  // Handle Mouse Dragging (Panning)
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const svgX = e.clientX - rect.left
    const svgY = e.clientY - rect.top

    // Cartesian position under cursor
    const x = toCartesianX(svgX)
    const y = toCartesianY(svgY)
    setCursorPos({ x, y })

    if (isDragging) {
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y

      const scaleX = (bounds.xMax - bounds.xMin) / svgWidth
      const scaleY = (bounds.yMax - bounds.yMin) / svgHeight

      setBounds((prev) => ({
        xMin: prev.xMin - dx * scaleX,
        xMax: prev.xMax - dx * scaleX,
        yMin: prev.yMin + dy * scaleY,
        yMax: prev.yMax + dy * scaleY,
      }))

      dragStart.current = { x: e.clientX, y: e.clientY }
    } else {
      // Find nearest key point (vertex or roots)
      const keyPoints = [
        { x: vertex.x, y: vertex.y, label: `Vertex: (${vertex.x}, ${vertex.y})` }
      ]

      if (x1 !== null) {
        keyPoints.push({ x: x1, y: 0, label: `Root x₁: (${x1}, 0)` })
      }
      if (x2 !== null) {
        keyPoints.push({ x: x2, y: 0, label: `Root x₂: (${x2}, 0)` })
      }
      
      // Y-intercept
      keyPoints.push({ x: 0, y: c, label: `y-Intercept: (0, ${c})` })

      let nearest: typeof keyPoints[0] | null = null
      let minDist = 0.5 // Maximum hover distance (Cartesian space)

      keyPoints.forEach((kp) => {
        const dX = x - kp.x
        const dY = y - kp.y
        const dist = Math.sqrt(dX * dX + dY * dY)
        if (dist < minDist) {
          minDist = dist
          nearest = kp
        }
      })

      setHoveredPoint(nearest)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault()
    const factor = e.deltaY > 0 ? 1.1 : 0.9
    handleZoom(factor)
  }

  // Export SVG to PNG image file
  const handleExportPNG = () => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const URL = window.URL || window.webkitURL || window
    const blobURL = URL.createObjectURL(svgBlob)
    
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = svgWidth * 2
      canvas.height = svgHeight * 2
      const context = canvas.getContext('2d')
      if (context) {
        context.fillStyle = '#0F172A'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        
        const pngURL = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.href = pngURL
        downloadLink.download = `parabola_y_${a}x2+${b}x+${c}.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      }
    }
    image.src = blobURL
  }

  const grid = getGridLines()

  return (
    <div className="flex flex-col h-full">
      {/* Graph Toolbar */}
      <div className="flex justify-between items-center mb-3 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-800/40 border border-slate-700/50 rounded-xl px-2.5 py-1.5 font-mono text-slate-400">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            X: {cursorPos ? cursorPos.x.toFixed(2) : '0.00'}
          </span>
          <span className="text-slate-600">|</span>
          <span>
            Y: {cursorPos ? cursorPos.y.toFixed(2) : '0.00'}
          </span>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => handleZoom(0.85)}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/70 transition-all active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(1.15)}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/70 transition-all active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/70 transition-all active:scale-95"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportPNG}
            className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-r from-violet-600/30 to-blue-600/30 border border-violet-500/30 text-violet-300 hover:text-white hover:from-violet-600 hover:to-blue-600 transition-all active:scale-95"
            title="Export PNG Image"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main SVG Graph Container */}
      <div className="relative flex-grow flex items-center justify-center border border-white/5 rounded-2xl overflow-hidden bg-slate-950/80 shadow-2xl">
        <svg
          ref={svgRef}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {/* Subtle Cybernetic Background Lines */}
          <rect width="100%" height="100%" fill="url(#cyber-pattern)" />
          
          {/* Dynamic Grid lines */}
          {grid.xLines}
          {grid.yLines}

          {/* Core Cartesian Coordinates Axes */}
          {/* X Axis */}
          <line
            x1={0}
            y1={toSvgY(0)}
            x2={svgWidth}
            y2={toSvgY(0)}
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth={1.5}
          />
          {/* Y Axis */}
          <line
            x1={toSvgX(0)}
            y1={0}
            x2={toSvgX(0)}
            y2={svgHeight}
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth={1.5}
          />

          {/* Parabola Plot Pathway */}
          <path
            d={getParabolaPath()}
            fill="none"
            stroke={themeColor}
            strokeWidth={3}
            strokeLinecap="round"
            filter="url(#neon-glow)"
          />

          {/* Highlights & Interactive Hotspots */}

          {/* Y-Intercept */}
          <circle
            cx={toSvgX(0)}
            cy={toSvgY(c)}
            r={5}
            fill="#06B6D4"
            className="transition-all hover:scale-150 duration-200"
            filter="url(#glow-cyan)"
          />

          {/* Roots Points */}
          {x1 !== null && (
            <circle
              cx={toSvgX(x1)}
              cy={toSvgY(0)}
              r={6}
              fill="#3B82F6"
              className="transition-all hover:scale-150 duration-200 cursor-pointer"
              filter="url(#glow-blue)"
            />
          )}

          {x2 !== null && (
            <circle
              cx={toSvgX(x2)}
              cy={toSvgY(0)}
              r={6}
              fill="#3B82F6"
              className="transition-all hover:scale-150 duration-200 cursor-pointer"
              filter="url(#glow-blue)"
            />
          )}

          {/* Vertex Point (Main Focus) */}
          <circle
            cx={toSvgX(vertex.x)}
            cy={toSvgY(vertex.y)}
            r={7}
            fill="#8B5CF6"
            className="transition-all hover:scale-150 duration-200 cursor-pointer"
            filter="url(#glow-purple)"
          />
          <circle
            cx={toSvgX(vertex.x)}
            cy={toSvgY(vertex.y)}
            r={12}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth={1}
            strokeDasharray="2 2"
            className="animate-pulse"
          />

          {/* Custom SVG Patterns and Filters definitions */}
          <defs>
            {/* Holographic grid dots pattern */}
            <pattern id="cyber-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="rgba(255, 255, 255, 0.08)" />
            </pattern>
            {/* Parabola Glow filter */}
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Roots and Vertex Neon Glows */}
            <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Hover / Tooltip HUD display on Graph overlay */}
        {hoveredPoint && (
          <div
            className="absolute z-10 glass-panel border border-violet-500/30 bg-slate-950/90 text-white font-mono text-[11px] px-3 py-2 rounded-xl shadow-2xl glow-purple animate-fade-in pointer-events-none"
            style={{
              left: `${Math.min(toSvgX(hoveredPoint.x) + 15, svgWidth - 160)}px`,
              top: `${Math.min(toSvgY(hoveredPoint.y) - 40, svgHeight - 50)}px`,
            }}
          >
            {hoveredPoint.label}
          </div>
        )}
      </div>

      {/* Axis Labels Info */}
      <div className="flex gap-4 justify-center items-center mt-3 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] glow-purple" />
          <span>Vertex ({vertex.x}, {vertex.y})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] glow-blue" />
          <span>Roots (y = 0)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] glow-cyan" />
          <span>y-Intercept (0, {c})</span>
        </div>
      </div>
    </div>
  )
}
