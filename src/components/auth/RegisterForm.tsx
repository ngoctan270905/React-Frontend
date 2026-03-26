import { useState } from 'react'
import '../../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { register, type RegisterData } from '../../api/auth'

export default function RegisterForm() {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')

  const [fullNameError, setFullNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone_number: string) => {
    return /^(0|\+84)[0-9]{9}$/.test(phone_number)
  }

  const registerMutation = useMutation({

    mutationFn: register,

    onSuccess: () => {
      navigate('/login')
    },

    onError: (error: any) => {
      setError(error.message || 'Đăng ký thất bại')
    }

  })

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()

    setError('')
    setFullNameError('')
    setEmailError('')
    setPhoneError('')
    setPasswordError('')
    setConfirmPasswordError('')

    let isValid = true

    // FULL NAME
    if (!fullName) {
      setFullNameError('Vui lòng nhập họ và tên')
      isValid = false
    }

    // EMAIL
    if (!email) {
      setEmailError('Vui lòng nhập email')
      isValid = false
    } else if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ (email@example.com)')
      isValid = false
    }

    // PHONE
    if (!phone_number) {
      setPhoneError('Vui lòng nhập số điện thoại')
      isValid = false
    } else if (!validatePhone(phone_number)) {
      setPhoneError('Số điện thoại không hợp lệ')
      isValid = false
    }

    // PASSWORD
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu')
      isValid = false
    } else if (password.length < 8) {
      setPasswordError('Mật khẩu phải ít nhất 8 ký tự')
      isValid = false
    }

    // CONFIRM PASSWORD
    if (!confirmPassword) {
      setConfirmPasswordError('Vui lòng nhập xác nhận mật khẩu')
      isValid = false
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp')
      isValid = false
    }

    if (!isValid) return

    const data: RegisterData = {
      fullname: fullName,
      email: email,
      phone_number: phone_number,
      password: password
    }

    registerMutation.mutate(data)
  }

  return (

    <div className="panel-form">

      <div className="form-panel active">

        <div className="form-heading">
          <h1>Tạo tài khoản mới</h1>
          <p>Tham gia cùng CEIN để nhận ưu đãi thành viên.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* FULL NAME */}
          <div className="field">
            <label>Họ và Tên</label>

            <div className={`input-wrap ${fullNameError ? 'error' : ''}`}>
              <i className="ph ph-user input-icon"></i>

              <input
                name="fullname"
                type="text"
                placeholder="Nguyễn Minh Anh"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {fullNameError && (
              <div className="field-error">{fullNameError}</div>
            )}
          </div>

          {/* EMAIL */}
          <div className="field">
            <label>Email</label>

            <div className={`input-wrap ${emailError ? 'error' : ''}`}>
              <i className="ph ph-envelope input-icon"></i>

              <input
                name="email"
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

          {/* PHONE */}
          <div className="field">
            <label>Số Điện Thoại</label>

            <div className={`input-wrap ${phoneError ? 'error' : ''}`}>
              <i className="ph ph-phone input-icon"></i>

              <input
                name="phone_number"
                type="tel"
                placeholder="+84 912 345 678"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {phoneError && (
              <div className="field-error">{phoneError}</div>
            )}
          </div>

          {/* PASSWORD */}
          <div className="field">

            <label>Mật Khẩu</label>

            <div className={`input-wrap ${passwordError ? 'error' : ''}`}>

              <i className="ph ph-lock input-icon"></i>

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ít nhất 8 ký tự"
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

          {/* CONFIRM PASSWORD */}
          <div className="field">

            <label>Xác Nhận Mật Khẩu</label>

            <div className={`input-wrap ${confirmPasswordError ? 'error' : ''}`}>

              <i className="ph ph-lock-key input-icon"></i>

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <i
                className={`ph ${showConfirmPassword ? 'ph-eye-slash' : 'ph-eye'} toggle-pw`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>

            </div>

            {confirmPasswordError && (
              <div className="field-error">{confirmPasswordError}</div>
            )}

          </div>
        
          {/* ERROR */}
          {error && (
            <div className="field-error server-error-main">
              {error}
            </div>
          )}
          
          {/* SUBMIT */}
          <button className="btn-submit" type="submit">
            {registerMutation.isPending
              ? 'Đang đăng ký...'
              : 'Tạo Tài Khoản'}
          </button>

        </form>

        <p className="switch-prompt">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>

      </div>

    </div>
  )
}