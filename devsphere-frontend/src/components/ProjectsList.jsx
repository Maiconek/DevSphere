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
                    'Authorization': "Bearer " + token.access_token,
                },
            })
            let data = await response.json()
            // console.log(data)
            setProjects(data)
        }
        catch (error) {
            console.error('Błąd połączenia:', error);
        }
    }

    return (
        <div className="album py-5 bg-body-teritiary">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {projects.map((item) => (
                        <ProjectCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        image={item.imageUrl}
                        intro={item.shortIntro}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}


export default ProjectsList;