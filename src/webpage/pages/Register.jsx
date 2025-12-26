import React, { useState } from 'react';
import '../styles/RegisterForm.css'; // We'll create this file

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    
    // Add validation if needed
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Proceed with form submission
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our app.</p>
      
      <div className="flex">
        <label>
          <input 
            className="input" 
            type="text" 
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required 
          />
          <span>Firstname</span>
        </label>

        <label>
          <input 
            className="input" 
            type="text" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required 
          />
          <span>Lastname</span>
        </label>
      </div>  
            
      <label>
        <input 
          className="input" 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <span>Email</span>
      </label> 
        
      <label>
        <input 
          className="input" 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <span>Password</span>
      </label>
      
      <label>
        <input 
          className="input" 
          type="password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required 
        />
        <span>Confirm password</span>
      </label>
      
      <button type="submit" className="submit">Submit</button>
      
      <p className="signin">
        Already have an account? <a href="#">Signin</a>
      </p>
    </form>
  );
};

export default RegisterForm;