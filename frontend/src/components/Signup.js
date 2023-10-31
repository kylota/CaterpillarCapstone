import React from 'react'
import {Link} from 'react-router-dom'

function SignUp(){
    return (

        <div>
            <h2>Sign Up</h2>
            <form action="">
                <div className="">
                    <label>Email</label>
                    <input placeholder='Enter Email'/>

                </div>
                <div className="">
                    <label>Password</label>
                    <input placeholder='Enter Password'/>
                </div>
                <div className="">
                    <label>Re-enter Password</label>
                    <input placeholder='Re-enter Password'/>
                </div>
                <button className="">Sign Up</button>
                <Link to="/" className=""> Login</Link>

            </form>
        </div>

    );
}

export default SignUp