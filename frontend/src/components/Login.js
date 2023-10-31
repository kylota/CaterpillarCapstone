import React from 'react'
import { useState } from "react";
import {Link} from 'react-router-dom'



function Login(){
    return (
        <div>
            <h2>Login</h2>
            <form action="">
                <div className="">
                    <label>Email</label>
                    <input placeholder='Enter Email' name='email'/>

                </div>
                <div className="">
                    <label>Password</label>
                    <input placeholder='Enter Password'name='password'/>

                </div>
                <button className="">Log in</button>
                <Link to="/signup" className="">Create Account</Link>

            </form>
        </div>

    );
}

export default Login