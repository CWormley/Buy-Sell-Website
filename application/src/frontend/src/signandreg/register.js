import React, { useState } from "react";
import './signreg.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Error states
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error states
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setTermsError(false);

    let hasError = false;

    // Validate email
    if (!email.endsWith('@sfsu.edu')) {
      setEmailError(true);
      hasError = true;
    }

    // Validate passwords match
    if (password === '') {
      setPasswordError(true);
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      hasError = true;
    }

    // Validate terms and conditions
    if (!acceptTerms) {
      setTermsError(true);
      hasError = true;
    }

    if (hasError) {
      return; // Stop form submission if there are errors
    }

    // Add logic for registration 
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div id="form-page">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your @sfsu.edu email"
            className={emailError ? 'error' : ''}
            required
          />
          {emailError && <p className="error-message">Please use an @sfsu.edu email address.</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={passwordError ? 'error' : ''}
            required
          />
          {passwordError && <p className="error-message">Password cannot be empty.</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className={confirmPasswordError ? 'error' : ''}
            required
          />
          {confirmPasswordError && <p className="error-message">Passwords do not match.</p>}
        </div>
        <div className="form-group terms">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className={termsError ? 'error' : ''}
          />
          <label htmlFor="acceptTerms">I accept the <a href="#">Terms and Conditions</a></label>
        </div>
        {termsError && <p className="error-message terms-error">You must accept the terms and conditions.</p>}
        <button type="submit" className="signin-button">Register</button>
        <div className="register-link">
          <p>Already have an account? <a href="/signin">Sign In</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;