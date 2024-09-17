import React, {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {

    const {loginUser} = useContext(AuthContext)

    return (
        <>
            <h1>Login</h1>
                <form onSubmit={loginUser}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/register'><p className="m-3">Don't have an account? Register here</p></Link>
            </form>
        </>
    )
}

export default Login;