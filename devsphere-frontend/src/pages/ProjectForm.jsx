import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Field from "../components/Field";
import TextareaField from "../components/TextareaField";
import Select from "react-select"; // Używamy poprawnej wersji z react-select

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

    // Funkcja obsługująca zmianę zaznaczonych tagów
    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions || []);  // Ustawienie wybranych tagów lub pustej listy
    };

    // Przekształcamy tagi do formatu obsługiwanego przez react-select
    const options = tags.map(tag => ({
        value: tag.id,
        label: tag.name
    }));

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
            tags: selectedTags.map(tag => ({ id: tag.value, name: tag.label })) // Dopasowanie formatu tagów
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
        <div className="d-flex flex-column align-items-center mt-3">
            <h1>Dodaj projekt</h1>
            <form onSubmit={createProject}>
                <Field 
                    name="title"
                    type="text"
                />
                <Field 
                    name="shortIntro"
                    type="text"
                />
                <TextareaField 
                    name="description"
                    type="text"
                />
                <Field 
                    name="link"
                    type="text"
                />
                <Field 
                    name="image"
                    type="file"
                    onChange={handleFileChange}
                />
                
                
                <Select 
                    isMulti
                    value={selectedTags}
                    onChange={handleTagChange}
                    options={options}
                    placeholder="Wybierz tagi"
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
                
                <div className="mt-2">
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                    <Link to="/"><button type="button" className="btn btn-secondary">Go back</button></Link>
                </div>
            </form>
        </div>
    )
}

export default ProjectForm;
