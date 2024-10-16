import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Field from "../components/Field";
import TextareaField from "../components/TextareaField";


const UserEditForm = () => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        company: ""
    });

    const [image, setImage] = useState(null);

    const {token} = useContext(AuthContext)
    const params = useParams()
    const id = params.id

    const navigate = useNavigate()

    useEffect(() => {
        getSingleUser()
    }, [])

    const getSingleUser = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
                method:'GET',
                headers: {
                    'Authorization': 'Bearer ' + token.access_token
                }
            })

            let data = await response.json()
            setUser({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                bio: data.bio ? data.bio : "",
                company: data.company ? data.company : ""
            })
        }
        catch(error) {
            console.log('Blad polaczenia: ', error)
        }
    }

    const editUser = async (e) => {
        e.preventDefault();

        let updatedProject = {
            firstName: e.target.firstname.value,
            lastName: e.target.lastname.value,
            bio: e.target.bio.value,
            company: e.target.company.value
        };

        const formData = new FormData();
        formData.append("user", new Blob([JSON.stringify(updatedProject)], {type: "application/json"}));
        if (image) {
            formData.append("image", image); // Dodaje obraz do FormData tylko, jeśli wybrano plik
        }

        try {
            let response = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
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


    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Przechowuje wybrany plik w stanie
    };


    return (
        <div className="d-flex flex-column align-items-center mt-3">
            <h1>Edit your profile</h1>
            <form onSubmit={editUser}>
                <Field
                    name="firstname"
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />

                <Field
                    name="lastname"
                    type="text"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />

                <TextareaField
                    name="bio"
                    type="text"
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                />

                <Field
                    name="company"
                    type="text"
                    value={user.company}
                    onChange={(e) => setUser({ ...user, company: e.target.value })}
                />

                <Field
                    name="image"
                    type="file"
                    onChange={handleFileChange}
                />
    
                <button type="submit" className="btn btn-primary me-2">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Go back</button>
            </form>
        </div>
    )
}

export default UserEditForm;