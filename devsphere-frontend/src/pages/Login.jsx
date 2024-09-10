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
                        <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInputUsername" name="username"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login;