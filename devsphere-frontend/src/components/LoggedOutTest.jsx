import React from "react";
import { Link } from "react-router-dom";

const LoggedOutTest = () => {
    return (
        <div>
            <h1>Niezalogowany, nie masz dostępu</h1>
            <div className="d-flex flex-row justify-content-center">
                <Link to="/register"><button className="btn btn-danger w-20 m-2">Register</button></Link>
                <Link to="/login"><button className="btn btn-success w-20m m-2">Login</button></Link>
            </div>
        </div>
    )
}

export default LoggedOutTest;