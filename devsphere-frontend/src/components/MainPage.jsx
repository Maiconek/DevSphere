import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import Header from "./Header";

const MainPage = () => {

    const {logoutUser, refreshToken} = useContext(AuthContext)

    return (
        <div>
            <Header />
            
            <div className="d-flex flex-column align-items-center">
            <h1>Zalogowany, masz dostęp</h1>
            <div className="d-flex flex-row justify-content-center">
                <Link to="/project-form"><button className="btn btn-success m-2">Add project</button></Link>
                <button className="btn btn-danger m-2" onClick={refreshToken}>Refresh token</button>
            </div>
            <ProjectsList />
            </div>
        </div>
    )
}

export default MainPage;