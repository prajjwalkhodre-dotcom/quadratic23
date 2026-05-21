import React, { useEffect, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export default function GlowingBlobs() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Canvas particle background
    const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    // Initialize particles
    const particleCount = 40
    const colors = ['rgba(139, 92, 246, 0.15)', 'rgba(59, 130, 246, 0.15)', 'rgba(6, 182, 212, 0.15)']
    const localParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      localParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      localParticles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Boundary checks
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.fill()
      })

      // Draw subtle connecting lines
      ctx.shadowBlur = 0 // Disable shadow for lines to keep performance high
      for (let i = 0; i < localParticles.length; i++) {
        for (let j = i + 1; j < localParticles.length; j++) {
          const dx = localParticles[i].x - localParticles[j].x
          const dy = localParticles[i].y - localParticles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(localParticles[i].x, localParticles[i].y)
            ctx.lineTo(localParticles[j].x, localParticles[j].y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.05 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background canvas */}
      <canvas id="particles-canvas" className="absolute inset-0 w-full h-full opacity-60" />

      {/* Floating Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-[#8B5CF6] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-float-1 animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[40rem] h-[40rem] bg-[#3B82F6] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-float-2 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[30rem] h-[30rem] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-float-3 animate-pulse-slow pointer-events-none" />
    </div>
  )
}
