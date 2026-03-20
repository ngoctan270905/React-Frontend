import { useState } from 'react'
import '../pages/Login.css'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="modal-wrap">
      <div className="modal">
        <h1>Create an account</h1>

        <div className="socials">
          <button className="btn-social" type="button">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <g>
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.347 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
              </g>
            </svg>
            Google
          </button>

          <button className="btn-social" type="button">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <circle cx="9" cy="9" r="9" fill="#1877F2" />
              <path d="M12.6 11.4l.4-2.6h-2.5V7.2c0-.7.3-1.4 1.4-1.4H13V3.5s-1.1-.2-2.2-.2c-2.2 0-3.7 1.4-3.7 3.9v2.2H4.8v2.6h2.3V18c.6.1 1.1.1 1.7.1s1.1 0 1.7-.1v-6.6h2.1z" fill="#fff" />
            </svg>
            Facebook
          </button>
        </div>

        <div className="divider">Or</div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <div className="input-wrap">
            <input id="email" type="email" placeholder="Enter your email" defaultValue="balamia@gmail.com" />
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
            <input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
            <button
              className="eye-btn"
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
  )
}
