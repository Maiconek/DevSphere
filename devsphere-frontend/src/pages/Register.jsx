import React, {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Field from "../components/Field";

const Register = () => {

    const {registerUser} = useContext(AuthContext)


    return (
        <div className="d-flex flex-column align-items-center mt-3">
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <Field 
                    name="firstname"
                    type="text"
                />
                <Field 
                    name="lastname"
                    type="text"
                />
                <Field 
                    name="password"
                    type="password"
                />
                <Field 
                    name="email"
                    type="email"
                />
                
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/login'><p className="m-3">Have an account? Login here</p></Link>
            </form>
        </div>
    )
}

export default Register;