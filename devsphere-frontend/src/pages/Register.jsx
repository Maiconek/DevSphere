import React, {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";

const Register = () => {

    const {registerUser} = useContext(AuthContext)


    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <FormField 
                    name="firstname"
                    type="text"
                />
                <FormField 
                    name="lastname"
                    type="text"
                />
                <FormField 
                    name="password"
                    type="password"
                />
                <FormField 
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