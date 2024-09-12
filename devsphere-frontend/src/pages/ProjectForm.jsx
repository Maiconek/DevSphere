import React, {useContext, useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user.username + " " + user.password)
    })

    let createProject = async (e) => {
        e.preventDefault()

        const username = user.username;
        const password = user.password; 
        // const basicAuth = 'Basic ' + btoa(username + ':' + password); // Kodowanie danych uwierzytelniających

        try {
            let response = await fetch('http://localhost:8080/api/v1/projects', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + btoa(username + ":" + password),
                },
                'body': JSON.stringify({
                    'title': e.target.title.value,
                    'shortIntro': e.target.shortIntro.value,
                    'description': e.target.description.value,
                    'link': e.target.link.value
                    // 'user': user
                }),
            })
            let data = await response.json();
            console.log('Data: ', data);
            navigate("/")

        }
        catch (error) {
            console.error('Błąd połączenia:', error);
        }
    }


    return (
        <>
            <h1>Dodaj projekt</h1>
            <form onSubmit={createProject}>
                <div className="mb-3">
                    <label htmlFor="exampleInputTitle1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="exampleInputTitle" name="title"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputShortIntro1" className="form-label">Short intro</label>
                    <input type="text" className="form-control" id="exampleInputShortIntro" name="shortIntro"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputDescription1" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="exampleInputDescription" name="description"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputLink1" className="form-label">Link</label>
                    <input type="text" className="form-control" id="exampleInputLink" name="link"/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default ProjectForm;