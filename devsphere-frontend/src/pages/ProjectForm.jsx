import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {

    const {token} = useContext(AuthContext)
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([]);

    // const username = user.username;
    // const password = user.password; 
    
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Token ", token)
        // console.log(user.username + " " + user.password)
        fetchTags()
        console.log(selectedTags)
    })

    let fetchTags = async () => {
        try {
            let response = await fetch('http://localhost:8080/api/v1/tags', {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.access_token,
                },
            })
            let data = await response.json();
            // console.log('Data: ', data);
            setTags(data);
        }
        catch (error) {
            console.error("Error, ", error)
        }
    }

    const handleTagChange = (tag) => {
        if (selectedTags.find(t => t.id === tag.id)) {
            setSelectedTags(selectedTags.filter(t => t.id !== tag.id)); // usuń tag
        } else {
            setSelectedTags([...selectedTags, tag]); // dodaj tag
        }
    };

    let createProject = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch('http://localhost:8080/api/v1/projects', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token.access_token,
                },
                'body': JSON.stringify({
                    'title': e.target.title.value,
                    'shortIntro': e.target.shortIntro.value,
                    'description': e.target.description.value,
                    'link': e.target.link.value,
                    'tags': selectedTags
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

                <div>
                <label>Tagi:</label>
                {tags.map(tag => (
                    <div key={tag.id}>
                        <input 
                            type="checkbox" 
                            value={tag.id} 
                            checked={selectedTags.some(t => t.id === tag.id)} 
                            onChange={() => handleTagChange(tag)} 
                        />
                        {tag.name}
                    </div>
                ))}
            </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default ProjectForm;