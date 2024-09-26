import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";

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
                    <table className="table table-hover w-75">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Image</th>
                                <th scope="col">Link</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {userProjects.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td><img src={item.imageUrl} className="image-table" alt="image"/></td>
                                <td>{item.link}</td>
                                <td>
                                    <Link to={`/project/${item.id}`}>
                                        <button type="button" className="btn btn-primary me-3">Visit</button>
                                    </Link>
                                    <Link to={`/project-form/${item.id}`}>
                                        <button type="button" className="btn btn-success me-3">Edit</button>
                                    </Link>
                                    <button type="button" className="btn btn-danger me-3" onClick={() => deleteProject(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}    
                        </tbody>
                    </table>
                </div>
                :
                <></>
            }
        </div>
    )
}

export default UserPage