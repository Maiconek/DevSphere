import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {

    const {token} = useContext(AuthContext)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getProjects()
    }, [])

    const getProjects = async () => {
        try {
            let response = await fetch('http://localhost:8080/api/v1/projects', {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token.access_token,
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
        <div className="container">
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