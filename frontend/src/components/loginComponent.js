import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../css/index.css';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';


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
          <Box  sx={{ backgroundColor: 'white', margin: '100px auto', width: '50vh', height: '50vh', borderRadius: '30px', boxShadow: 3 }}>
            <Stack sx={{margin: 'auto'}}>
            <Typography sx={{textAlign: 'center', margin:'auto', fontSize:'50px', fontFamily:'Arial', fontWeight: 'bolder', color:'#2f74f5', margin: '20px 0' }}>
              Login
            </Typography>
            <div className="">
              <Stack sx={{margin: '20px auto', width:'60%'}}>
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
                <Button type="submit" variant="outlined" sx={{margin:'15px', color:'#2447b3', fontSize:'15px'}}>
                  Login
                </Button>
                <Link to="/signup" className="link" style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                  Create Account
                </Link>
              </Stack>
            </div>
            </Stack>
          </Box>
        </form>
    </div>
  </>

);
}

export default Login