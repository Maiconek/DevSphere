import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import Table from "../components/Table";

const UserPage = () => {
    const [searchedUser, setSearchedUser] = useState('')
    const [userProjects, setUserProjects] = useState([])
    const {token, user} = useContext(AuthContext)
    const params = useParams()
    const id = params.id

    useEffect(() => {
        getSingleUser()
        getUserProjects()
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
            setSearchedUser(data)
        }
        catch(error) {
            console.log('Blad polaczenia: ', error)
        }
    }

    const getUserProjects = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/projects/user/${id}`, {
                method:'GET',
                headers: {
                    'Authorization': "Bearer " + token.access_token 
                }
            })

            let data = await response.json()
            setUserProjects(data)
        }
        catch (error) {
            console.error('Blad polaczenia ', error)
        }
    }

    const deleteProject = async (projectId) => {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/projects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': "Bearer " + token.access_token 
                }
            })

            setUserProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
        }
        catch (error) {
            console.error('Blad polaczenia ', error)
        }
    }

    return (
        <div>
            <h1>{searchedUser.firstName} {searchedUser.lastName}</h1>
            <p>{searchedUser.email}</p>
            {searchedUser.email === user.sub ?
                <div>
                    <Link to={`/users/edit/${searchedUser.id}`}>
                        <button type="button" className="btn btn-primary me-2">Edit</button>
                    </Link>
                    
                    <h2>Your projects:</h2>
                    <Table 
                        projects={userProjects}
                        delete={deleteProject}    
                    />
                </div>
                :
                <></>
            }
        </div>
    )
}

export default UserPage