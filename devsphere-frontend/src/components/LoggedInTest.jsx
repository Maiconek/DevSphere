import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProjectsList from "./ProjectsList";

const LoggedInTest = () => {

    const {logoutUser, refreshToken} = useContext(AuthContext)

    return (
        <div>
            <h1>Zalogowany, masz dostęp</h1>
            <div className="d-flex flex-row justify-content-center">
                <Link to="/project-form"><button className="btn btn-success m-2">Add project</button></Link>
                <button className="btn btn-primary m-2" onClick={logoutUser}>Logout</button>
                <button className="btn btn-danger m-2" onClick={refreshToken}>Refresh token</button>
            </div>
            <ProjectsList />
        </div>
    )
}

export default LoggedInTest;