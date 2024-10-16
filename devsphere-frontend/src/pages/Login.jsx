import React, {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Field from "../components/Field";

const Login = () => {

    const {loginUser} = useContext(AuthContext)

    return (
        <div className="d-flex flex-column align-items-center mt-3">
            <h1>Login</h1>
                <form onSubmit={loginUser}>
                    <Field
                        name="email"
                        type="email"
                    />
                    <Field
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