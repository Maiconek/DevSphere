import React, {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import FormField from "../components/FormField";

const Login = () => {

    const {loginUser} = useContext(AuthContext)

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Login</h1>
                <form onSubmit={loginUser}>
                    <FormField
                        name="email"
                        type="email"
                    />
                    <FormField
                        name="password"
                        type="password"
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/register'><p className="m-3">Don't have an account? Register here</p></Link>
            </form>
        </div>
    )
}

export default Login;