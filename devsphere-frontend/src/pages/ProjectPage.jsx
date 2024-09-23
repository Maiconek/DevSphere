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
        }
        catch (error) {
            console.error('Błąd połączenia:', error);
        }
    }

    return (
        <div>
        <Header/>
            <h1>{project.title}</h1>
        </div>
    )
}

export default ProjectPage;