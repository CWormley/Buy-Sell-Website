import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './signreg.css';
import { login } from '../auth';
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect') || '/dashboard';
    const [successMessage, setSuccessMessage] = useState('');
    

    const from = location.state?.from || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic for sign-in
        try {
            const data = await login(email, password);
            console.log('Login successful:', data);
            setSuccessMessage('Login Successful!');
            setTimeout(() => {
                navigate(redirect);
                window.location.reload();
            }, 2000);
            
        } catch (error) {
            console.error('Login failed:', error);
            setSuccessMessage('Invalid credentials. Please try again.');
        }
    };

    return (
        <div id="form-page">
            <form className="signin-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Sign In</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {/* Forgot Password Link */}
                <div className="forgot-password">
                    <a href="#" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                </div>
                <button type="submit" className="signin-button">Sign In</button>
                {/* Register Link */}
                <div className="register-link">
                    <p>Don't have an account? <a href="../register">Register</a></p>
                </div>
            </form>
            {successMessage && (
                <div style={{
                    position: 'fixed',
                    top: '1.5rem',
                    right: '1.5rem',
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    fontWeight: 'bold',
                    }}>
                    {successMessage}
                    </div>
                    )}
        </div>
    );
};

export default SignIn;