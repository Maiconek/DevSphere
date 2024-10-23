import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const ProjectPage = () => {

    const {token} = useContext(AuthContext)
    const [project, setProject] = useState('')
    const params = useParams()
    const id = params.id

    useEffect(() => {
        getSingleProject()
    }, [])

    const getSingleProject = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/projects/${id}`, {
                method : 'GET',
                'headers': {
                    'Authorization': "Bearer " + token.access_token,
                },
            })
            let data = await response.json()
            setProject(data)
            console.log(data)
        }
        catch (error) {
            console.error('Błąd połączenia:', error);
        }
    }

    return (
        <div className="project-container">
            <div className="project-info">
                <img src={project.imageUrl} className="project-image"></img>
                <h1>{project.title}</h1>
                <p>Link to source code:</p>
                <p>link</p>
                <div className="d-flex flex-column align-items-center">
                    <h2>Used technologies:</h2>
                    <div className="d-flex flex-row justify-content-center">
                        {project.tags && project.tags.map((item, index) => (
                            <p key={index} className="badge bg-secondary mt-2 me-2">{item.name}</p>
                        ))}
                    </div>
                </div>  
            </div>
            <div className="project-description">
                <h2>About project</h2>
                <p>{project.description}</p>
            </div>
        </div>
    )
}

export default ProjectPage;