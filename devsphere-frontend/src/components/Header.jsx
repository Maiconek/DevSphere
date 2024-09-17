import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {

    const {logoutUser} = useContext(AuthContext)

    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <p className="navbar-brand">DevSphere</p>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 text-white text-decoration-none"><p>Home</p></Link></li>
                        <li><Link to="/users" className="nav-link px-2 text-white"><p>Users</p></Link></li>
                    </ul>
                    <div className="text-end">
                        <button type="button" class="btn btn-warning" onClick={logoutUser}>Logout</button>
                    </div>
                 </div>
            </div>
        </header>
    )
}

export default Header;