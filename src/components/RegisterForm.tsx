import { useState } from 'react'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { register, type RegisterData, type RegisterResponse } from '../api/auth'

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        const data: RegisterData = { username, password };

        try {
            const response: RegisterResponse = await register(data);
            console.log('Register response:', response);
            if (response.success) {
                setSuccessMessage("Đăng ký thành công.");
                navigate("/login");
            } else {
                setError(response.message);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="modal-wrap">
            <div className="modal">
                <h1>Create an account</h1>

                {/* Username Field */}
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
                            onChange={handleUsernameChange}
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="field">
                    <div className="field-header">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-wrap">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a password"
                            value={password}
                            onChange={handlePasswordChange}

                        />
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
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div className="field">
                    <div className="field-header">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    <div className="input-wrap">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <button
                            className="eye-btn"
                            type="button"
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                            {showConfirmPassword ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                {successMessage && <p className="success-message">{successMessage}</p>}

                <button className="btn-cta" type="button" onClick={handleSubmit}>
                    Sign Up
                </button>

                <p className="footer-link">
                    Already Have An Account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    )
}