import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";

const LoggedInTest = () => {

    const {logoutUser} = useContext(AuthContext)

    return (
        <div>
            <h1>Zalogowany, masz dostęp</h1>
            <button className="btn btn-primary" onClick={logoutUser}>Logout</button>
        </div>
    )
}

export default LoggedInTest;