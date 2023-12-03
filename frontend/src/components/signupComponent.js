import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/index.css'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Check if email is already in use
    try {
      const response = await fetch('http://localhost:4000/landing/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        // If the registration is successful, you can redirect to the login page
        // or perform any other action as needed
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed');
    }
  };

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <h2>Sign Up</h2> 
              <div className="">
                  <div className="input-container">
          <label>Email</label>
          <input
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
                  <div className="input-container">
          <label>Password</label>
          <input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
                  <div className="input-container">
          <label>Re-enter Password</label>
          <input
            placeholder="Re-enter Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div></div>
        <button type="submit" className="">
          Submit
        </button>
        <Link to="/login" className="">
          Login
        </Link>
      </form>
    </div>
  );
}

export default SignUp;