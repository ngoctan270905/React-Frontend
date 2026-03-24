import { useState } from 'react'
import '../pages/Login.css'
import { Link } from 'react-router-dom'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="modal-wrap">
      <div className="modal">
        <h1>Log in to your account</h1>

        <div className="field">
          <div className="field-header">
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-wrap">
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
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

        <button className="btn-cta" type="submit">
          Log in
        </button>

        <p className="footer-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}