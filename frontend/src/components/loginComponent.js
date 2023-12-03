import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../css/index.css';

function Login({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email and password if needed
    // Send request to backend to verify email and password
    try {
      //begin API call
      const response = await fetch("http://localhost:4000/landing/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (data.success) {
        // Successful API response
        console.log('Successful');
        onLogin();
      } else {
        console.log('login failed'); // Unsuccessful API response
      }
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };


return (
  <><div>
        <form onSubmit={handleSubmit} action="">
            <h2>Login</h2>
            <div className="">

                <div className="input-container">
                    <label for="emailInput">Email</label>
                    <input
                        placeholder='Enter Email'
                        id="emailInput"
                        name="email"
                        maxLength="45"
                        value={email}
                        onChange={handleEmailChange} />
                </div>
                <div className="input-container">
                    <label for="passwordInput">Password</label>
                    <input
                        placeholder='Enter Password'
                        id="passwordInput"
                        name="password"
                        maxLength="15"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange} />
                </div>
            </div>
            <button type="submit" className="">
                Submit
            </button>
            <Link to="/signup" className="link">
                Create Account
            </Link>
        </form>
    </div>
        <img src="./Caterpillar.png" className="img-center" alt="team logo" /></>

);
}

export default Login