import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {

    const {user} = useContext(AuthContext)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getProjects()
    }, [])

    const getProjects = async () => {
        const username = user.username;
        const password = user.password; 
        try {
            let response = await fetch('http://localhost:8080/api/v1/projects', {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + btoa(username + ":" + password),
                },
            })
            let data = await response.json()
            console.log(data)
            setProjects(data)
        }
        catch (error) {
            console.error('Błąd połączenia:', error);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {projects.map((item) => (
                    <ProjectCard
                    key={item.id}
                    title={item.title}/>
                ))}
            </div>
        </div>
    )

}


export default ProjectsList;