import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {

    const {logoutUser} = useContext(AuthContext)

    return (
        // <header className="p-3 text-bg-dark">
        //     <div className="container">
        //         <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        //             <p className="navbar-brand">DevSphere</p>

        //             <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        //                 <li><Link to="/" className="nav-link px-2 text-white text-decoration-none"><p>Home</p></Link></li>
        //                 <li><Link to="/users" className="nav-link px-2 text-white"><p>Users</p></Link></li>
        //             </ul>
        //             <div className="text-end">
        //                 <button type="button" class="btn btn-warning" onClick={logoutUser}>Logout</button>
        //             </div>
        //          </div>
        //     </div>
        // </header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Eleventh navbar example">
            <div className="container-fluid">
                <a className="navbar-brand">DevSphere</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample09">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>
                    </ul>
                </div>

                <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                    <button className="btn btn-danger" onClick={logoutUser}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Header;