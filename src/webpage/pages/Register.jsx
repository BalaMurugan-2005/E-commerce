import React, { useState } from "react";
import '../styles/RegisterForm.scss';
import { FiUser, FiSmartphone, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Register data:", formData);
    alert("Account created successfully! Welcome to ShopSphere!");
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="floating-shapes">
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        <div className="logo">ShopSphere</div>
        <h1>Create Your Account</h1>

        <div className="form-group">
          <label className={focusedField === "name" ? "focused" : ""}>
            Full Name
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
              placeholder="Enter your full name"
            />
            <FiUser className="input-icon" />
          </label>
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className={focusedField === "mobile" ? "focused" : ""}>
            Mobile Number
            <input 
              type="tel" 
              name="mobile" 
              value={formData.mobile} 
              onChange={handleChange}
              onFocus={() => handleFocus("mobile")}
              onBlur={handleBlur}
              placeholder="10-digit mobile number"
              maxLength="10"
            />
            <FiSmartphone className="input-icon" />
          </label>
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label className={focusedField === "email" ? "focused" : ""}>
            Email Address
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              placeholder="your.email@example.com"
            />
            <FiMail className="input-icon" />
          </label>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className={focusedField === "password" ? "focused" : ""}>
            Password
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
              placeholder="At least 6 characters"
            />
            <span 
              className="input-icon"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </label>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label className={focusedField === "confirmPassword" ? "focused" : ""}>
            Confirm Password
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange}
              onFocus={() => handleFocus("confirmPassword")}
              onBlur={handleBlur}
              placeholder="Re-enter your password"
            />
            <span 
              className="input-icon"
              style={{ cursor: "pointer" }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </label>
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="create-btn">
          Create Account
        </button>

        <p className="terms">
          By creating an account, you agree to our 
          <span> Conditions of Use</span> and <span>Privacy Policy</span>.
        </p>

        <hr />

        <p className="signin">
          Already have an account? <a href="/login">Sign in here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;