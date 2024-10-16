import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Field from "../components/Field";
import TextareaField from "../components/TextareaField";

const ProjectEditForm = () => {

    const { token } = useContext(AuthContext);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [project, setProject] = useState({
        title: "",
        shortIntro: "",
        description: "",
        link: ""
    });
    const [image, setImage] = useState(null);

    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();

    useEffect(() => {
        fetchTags();
        fetchProject();
    }, []);

    useEffect(() => {
        console.log(selectedTags)
    }, [selectedTags])

    // Pobieranie istniejących tagów
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

    // Pobieranie istniejącego projektu
    const fetchProject = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/projects/${id}`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token.access_token,
                },
            });
            let data = await response.json();
            setProject({
                title: data.title,
                shortIntro: data.shortIntro,
                description: data.description,
                link: data.link
            });
            setSelectedTags(data.tags); // Inicjalizuje zaznaczone tagi
        } catch (error) {
            console.error("Error fetching project: ", error);
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

    // Funkcja do edytowania projektu
    const editProject = async (e) => {
        e.preventDefault();

        let updatedProject = {
            title: e.target.title.value,
            shortIntro: e.target.shortIntro.value,
            description: e.target.description.value,
            link: e.target.link.value,
            tags: selectedTags
        };

        const formData = new FormData();
        formData.append("project", new Blob([JSON.stringify(updatedProject)], {type: "application/json"}));
        if (image) {
            formData.append("imageFile", image); // Dodaje obraz do FormData tylko, jeśli wybrano plik
        }

        try {
            let response = await fetch(`http://localhost:8080/api/v1/projects/${id}`, {
                method: "PUT",
                headers: {
                    'Authorization': "Bearer " + token.access_token,
                },
                body: formData
            });
            if (response.ok) {
                let data = await response.json();
                console.log("Updated Data: ", data);
                navigate(-1); // Przekierowanie po sukcesie
            } else {
                console.error("Błąd podczas edytowania projektu");
            }
        } catch (error) {
            console.error("Błąd połączenia:", error);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mt-3">
            <h1>Edytuj projekt</h1>
            <form onSubmit={editProject}>
                <Field
                    name="title"
                    type="text"
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                />

                <Field
                    name="shortIntro"
                    type="text"
                    value={project.shortIntro}
                    onChange={(e) => setProject({ ...project, shortIntro: e.target.value })}
                />

                <TextareaField
                    name="description"
                    type="text"
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                />

                <Field
                    name="link"
                    type="text"
                    value={project.link}
                    onChange={(e) => setProject({ ...project, link: e.target.value })}
                />

                <Field
                    name="image"
                    type="file"
                    onChange={handleFileChange}
                />
                
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
                
                <button type="submit" className="btn btn-primary me-2">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Go back</button>
            </form>
        </div>
    );
}

export default ProjectEditForm;
