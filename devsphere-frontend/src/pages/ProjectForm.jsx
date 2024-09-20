import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ProjectForm = () => {

    const { token } = useContext(AuthContext);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [image, setImage] = useState(null); // Nowe pole do przechowywania pliku obrazu

    const navigate = useNavigate();

    useEffect(() => {
        fetchTags();
        console.log(selectedTags)
    }, []);

    const fetchTags = async () => {
        try {
            let response = await fetch("http://localhost:8080/api/v1/tags", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token.access_token,
                },
            });
            let data = await response.json();
            setTags(data);
        } catch (error) {
            console.error("Error fetching tags: ", error);
        }
    };

    const handleTagChange = (tag) => {
        if (selectedTags.find(t => t.id === tag.id)) {
            setSelectedTags(selectedTags.filter((t) => t.id !== tag.id)); // usuń tag
        } else {
            setSelectedTags([...selectedTags, tag]); // dodaj tag
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Przechowuje wybrany plik w stanie
    };

    const createProject = async (e) => {
        e.preventDefault();

        let project = {
            title: e.target.title.value,
            shortIntro: e.target.shortIntro.value,
            description: e.target.description.value,
            link: e.target.link.value,
            tags: selectedTags
        }

        const formData = new FormData();
        formData.append("project", new Blob([JSON.stringify(project)], {type: "application/json"}))
        formData.append("imageFile", image); // Dodaje obraz do FormData
        console.log(project)

        try {
            let response = await fetch("http://localhost:8080/api/v1/projects", {
                method: "POST",
                headers: {
                    'Authorization': "Bearer " + token.access_token,
                },
                body: formData
            });
            let data = await response.json();
            console.log("Data: ", data);
            navigate("/");
        } catch (error) {
            console.error("Błąd połączenia:", error);
        }
    };


    return (
        <div className="d-flex flex-column align-items-center">
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

                <div className="mb-3">
                    <label htmlFor="exampleInputImage1" className="form-label">Upload image</label>
                    <input type="file" className="form-control" id="exampleInputImage" name="image" onChange={handleFileChange}/>
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
                <Link to="/"><button type="button" className="btn btn-secondary">Go back</button></Link>
            </form>
        </div>
    )
}

export default ProjectForm;