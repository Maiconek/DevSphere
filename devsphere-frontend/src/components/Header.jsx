import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {

    const {logoutUser, token} = useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-lg bg-secondary">
            <div className="container-fluid">
                <a className="navbar-brand text-light">DevSphere</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to="/users">Users</Link>
                        </li>
                    </ul>
                </div>

                {token  &&
                    <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                        <button className="btn btn-danger" onClick={logoutUser}>Logout</button>
                    </div>
                }
                
            </div>
        </nav>
    )
}

export default Header;