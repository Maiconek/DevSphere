import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import Section from "./Section";

const MainPage = () => {


    return (
        <div> 
            <Section />        
            <ProjectsList />
        </div>
    )
}

export default MainPage;