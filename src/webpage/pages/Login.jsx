import React, { useState } from 'react';
import '../styles/Login.scss'; 
const Login = () => {
  // State variables
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Successful login simulation
      console.log('Login attempt with:', { email: formData.email });
      setLoginSuccess(true);
      
      // Reset form after successful login
      setTimeout(() => {
        setLoginSuccess(false);
        // In a real app, you would redirect to dashboard
        console.log('Redirecting to dashboard...');
      }, 2000);
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        submit: 'Invalid email or password. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Social login handlers
  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}...`);
    alert(`Redirecting to ${provider} authentication...`);
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    alert('Redirecting to password reset page...');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Header with logo */}
        <div className="login-header">
          <div className="logo">
            <i className="fas fa-shopping-bag"></i>
            <span>ShopSphere</span>
          </div>
          <h1>Welcome Back</h1>
          <p className="subtitle">
            Sign in to access your account and continue shopping
          </p>
        </div>

        {/* Success message */}
        {loginSuccess && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <p>Login successful! Redirecting to your dashboard...</p>
          </div>
        )}

        {/* Main login form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email field */}
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
              autoComplete="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Remember me and forgot password */}
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button 
              type="button" 
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Signing In...
              </>
            ) : (
              <>
                Sign In <i className="fas fa-arrow-right"></i>
              </>
            )}
          </button>

          {/* Submit error */}
          {errors.submit && <span className="error-message submit-error">{errors.submit}</span>}
        </form>

        {/* Alternative login options */}
        <div className="alternative-login">
          <p className="divider">
            <span>Or continue with</span>
          </p>
          <div className="social-buttons">
            <button 
              type="button" 
              className="social-btn google"
              onClick={() => handleSocialLogin('Google')}
            >
              <i className="fab fa-google"></i> Google
            </button>
            <button 
              type="button" 
              className="social-btn facebook"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
          </div>
        </div>

        {/* Sign up link */}
        <div className="register-link">
          <p>
            Don't have an account?
            <a href="/register" className="signup-btn">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;