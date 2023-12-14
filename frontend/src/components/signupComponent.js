import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/index.css'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';



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
        alert('Registration successful! Please check your email for a confirmation link to complete your registration'); 
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
          <Box  sx={{ backgroundColor: 'white', margin: '100px auto', width: '50vh', height: 'auto', borderRadius: '30px', boxShadow: 3 }}>
            <Stack sx={{margin: 'auto'}}>
            <Typography sx={{textAlign: 'center', fontSize:'50px', fontFamily:'Arial', fontWeight: 'bolder', color:'#2f74f5',margin: '20px 0' }}>
              Sign Up
            </Typography>
            <div className="">
              <Stack sx={{margin: '20px auto', width:'50%'}}>
                <TextField sx={{margin: '10px'}}
                  className="input-container"
                  required
                  label="Email Address"
                  variant="filled"
                  id="emailInput"
                  name="email"
                  maxLength="45"
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField sx={{margin:'10px'}}
                  className="input-container"
                  required
                  label="Password"
                  variant="filled"
                  id="passwordInput"
                  name="password"
                  maxLength="15"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <TextField sx={{margin:'10px'}}
                  className="input-container"
                  required
                  label="Re-enter Password"
                  variant="filled"
                  id="passwordInput"
                  name="password"
                  maxLength="15"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <Button type="submit" variant="outlined" sx={{margin:'15px', color:'#2447b3', fontSize:'15px'}}>
                  Sign Up
                              </Button>
                              <Link
                                  to="/login"
                                  className="link"
                                  sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                              >
                                  or Login
                              </Link>
                          </Stack>
            </div>
            </Stack>
              </Box> 
        </form>
      </div>
  );
}

export default SignUp;
