import { useEffect, useRef, useState } from 'react'
import './Login.css'

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

export default function Login() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [showPassword, setShowPassword] = useState(false)

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
    <div className="login">
      <canvas ref={canvasRef} id="space" aria-hidden="true" />
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />

      <div className="modal-wrap">
        <div className="modal">
          <h1>Create an account</h1>

          <div className="socials">
            <button className="btn-social" type="button">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <g>
                  <path
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.347 2.827.957 4.042l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
                    fill="#EA4335"
                  />
                </g>
              </svg>
              Google
            </button>

            <button className="btn-social" type="button">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <circle cx="9" cy="9" r="9" fill="#1877F2" />
                <path
                  d="M12.6 11.4l.4-2.6h-2.5V7.2c0-.7.3-1.4 1.4-1.4H13V3.5s-1.1-.2-2.2-.2c-2.2 0-3.7 1.4-3.7 3.9v2.2H4.8v2.6h2.3V18c.6.1 1.1.1 1.7.1s1.1 0 1.7-.1v-6.6h2.1z"
                  fill="#fff"
                />
              </svg>
              Facebook
            </button>
          </div>

          <div className="divider">Or</div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="input-wrap">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                defaultValue="balamia@gmail.com"
              />
            </div>
          </div>

          <div className="field">
            <div className="field-header">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot">
                Forgot ?
              </a>
            </div>
            <div className="input-wrap">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
              />
              <button
                className="eye-btn"
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M1 1l22 22" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button className="btn-cta" type="button">
            Create account
          </button>

          <p className="footer-link">
            Already Have An Account ? <a href="#">Log In</a>
          </p>
        </div>
      </div>
    </div>
  )
}
