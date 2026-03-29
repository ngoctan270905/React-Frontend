import { useState } from 'react'
import '../../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { login, type LoginData } from '../../api/auth'
import { useUser } from '../../context/UserContext'

export default function LoginForm() {
  const { refetchUser } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  const loginMutation = useMutation({

    mutationFn: login,

    onSuccess: async (data) => {
      localStorage.setItem('token', data.access_token)
      await refetchUser()
      navigate('/')
    },

    onError: () => {
      setError('Sai tài khoản hoặc mật khẩu')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()

    setError('')
    setEmailError('')
    setPasswordError('')

    let isValid = true

    if (!email) {
      setEmailError('Vui lòng nhập email')
      isValid = false
    } else if (!validateEmail(email)) {
      setEmailError('Vui lòng nhập đúng định dạng email: email@example.com')
      isValid = false
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu')
      isValid = false
    }

    if (!isValid) return

    const data: LoginData = {
      email: email,
      password
    }

    loginMutation.mutate(data)
  }

  return (

    <div className="panel-form">

      <div className="form-panel active">

        <div className="form-heading">
          <h1>Đăng nhập tài khoản</h1>
          <p>Nhập thông tin để tiếp tục mua sắm cùng CEIN.</p>
        </div>
        
        {/* FORM */}
        <form onSubmit={handleSubmit} noValidate>

          {/* EMAIL */}
          <div className="field">
            <label>Email</label>

            <div className={`input-wrap ${emailError ? 'error' : ''}`}>

              <i className="ph ph-envelope input-icon"></i>

              <input
                name='email'
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>
            {emailError && (
              <div className="field-error">{emailError}</div>
            )}
          </div>

          {/* PASSWORD */}
          <div className="field">

            <label>Mật Khẩu</label>

            <div className={`input-wrap ${passwordError ? 'error' : ''}`}>

              <i className="ph ph-lock input-icon"></i>

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <i
                className={`ph ${showPassword ? 'ph-eye-slash' : 'ph-eye'} toggle-pw`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>

            </div>
            {passwordError && (
              <div className="field-error">{passwordError}</div>
            )}

          </div>

          {/* REMEMBER + FORGOT */}
          <div className="form-row">

            <label className="checkbox-wrap">
              <input type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>

            <Link to="/forgot-password" className="forgot-link">
              Quên mật khẩu?
            </Link>

          </div>

          {/* ERROR */}
          {error && <div className="field-error server-error-main">{error}</div>}

          {/* SUBMIT */}
          <button className="btn-submit" type="submit">

            {loginMutation.isPending
              ? 'Đang đăng nhập...'
              : 'Đăng Nhập'}

          </button>

        </form>

        <div className="divider">
          <span>Hoặc tiếp tục với</span>
        </div>

        <div className="social-btns">
          <button className="btn-social">Google</button>
          <button className="btn-social">Facebook</button>
        </div>

        <p className="switch-prompt">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>

      </div>

    </div>
  )
}