import React, { useState } from "react";
import './signreg.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic for sign-in
        console.log("Email:", email);
        console.log("Password:", password);
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
        </div>
    );
};

export default SignIn;