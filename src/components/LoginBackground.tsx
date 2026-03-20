import { useEffect, useRef } from 'react'
import '../pages/Login.css'

type Star = { x: number; y: number; r: number; a: number; da: number }
type Trail = {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  life: number
  fade: number
  width: number
}

export default function LoginBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    let frame = 0

    let stars: Star[] = []
    let trails: Trail[] = []
    let animationId = 0

    const rand = (a: number, b: number) => Math.random() * (b - a) + a

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    const initStars = () => {
      stars = []
      const n = Math.floor((W * H) / 2200)

      for (let i = 0; i < n; i++) {
        stars.push({
          x: rand(0, W),
          y: rand(0, H),
          r: rand(0.2, 1.4),
          a: rand(0.2, 1),
          da: rand(0.002, 0.006) * (Math.random() < 0.5 ? 1 : -1),
        })
      }

      for (let c = 0; c < 5; c++) {
        const cx = rand(0, W)
        const cy = rand(0, H)
        for (let i = 0; i < 60; i++) {
          stars.push({
            x: cx + rand(-80, 80),
            y: cy + rand(-80, 80),
            r: rand(0.15, 0.8),
            a: rand(0.15, 0.7),
            da: rand(0.001, 0.004) * (Math.random() < 0.5 ? 1 : -1),
          })
        }
      }
    }

    const spawnTrail = () => {
      const edge = Math.random() < 0.5
      trails.push({
        x: edge ? rand(0, W) : rand(0, W * 0.3),
        y: edge ? rand(0, H * 0.4) : rand(0, H * 0.3),
        vx: rand(2.5, 5.5),
        vy: rand(1.2, 3.0),
        len: rand(60, 160),
        life: 1,
        fade: rand(0.012, 0.022),
        width: rand(0.5, 1.4),
      })
    }

    const drawStars = () => {
      stars.forEach(s => {
        s.a += s.da
        if (s.a > 1 || s.a < 0.1) s.da *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210,225,255,${s.a})`
        ctx.fill()
      })
    }

    const drawTrails = () => {
      trails.forEach(t => {
        const grad = ctx.createLinearGradient(
          t.x - (t.vx * t.len) / 5,
          t.y - (t.vy * t.len) / 5,
          t.x,
          t.y,
        )
        grad.addColorStop(0, `rgba(180,215,255,0)`)
        grad.addColorStop(1, `rgba(200,225,255,${t.life * 0.7})`)

        ctx.beginPath()
        ctx.moveTo(t.x - (t.vx * t.len) / 5, t.y - (t.vy * t.len) / 5)
        ctx.lineTo(t.x, t.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = t.width
        ctx.stroke()

        t.x += t.vx
        t.y += t.vy
        t.life -= t.fade
      })

      trails = trails.filter(t => t.life > 0 && t.x < W + 50 && t.y < H + 50)
    }

    const loop = () => {
      animationId = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, W, H)
      drawStars()
      drawTrails()
      frame++
      if (frame % 55 === 0) spawnTrail()
    }

    const onResize = () => {
      resize()
      initStars()
    }

    window.addEventListener('resize', onResize)
    resize()
    initStars()
    for (let i = 0; i < 3; i++) spawnTrail()
    loop()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} id="space" aria-hidden="true" />
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />
    </>
  )
}
