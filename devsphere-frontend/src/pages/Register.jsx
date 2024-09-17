import React, {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const {registerUser} = useContext(AuthContext)


    return (
        <>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <div className="mb-3">
                    <label htmlFor="exampleInputFirstname1" className="form-label">Firstname</label>
                    <input type="text" className="form-control" id="exampleInputFirstname" name="firstname"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputLastname1" className="form-label">Lastname</label>
                    <input type="text" className="form-control" id="exampleInputLastname" name="lastname"/>
                </div>
                

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/login'><p className="m-3">Have an account? Login here</p></Link>
            </form>
        </>
    )
}

export default Register;