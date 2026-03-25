import { useState } from 'react'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { login, type LoginData } from '../api/auth'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token)
      navigate('/')
    },

    onError: () => {
      setError('Sai tài khoản hoặc mật khẩu')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setError('')

    const data: LoginData = {
      username,
      password
    }

    loginMutation.mutate(data)
  }

  return (
    <div className="login-page">
      <div className="modal-wrap">
        <div className="modal">
          <h1>Log in to your account</h1>

          <form onSubmit={handleSubmit}>

            <div className="field">
              <div className="field-header">
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-wrap">
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="field-header">
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button className="btn-cta" type="submit">
              {loginMutation.isPending ? 'Logging in...' : 'Log in'}
            </button>

          </form>

          <p className="footer-link">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>

        </div>
      </div>
    </div>
  )
}