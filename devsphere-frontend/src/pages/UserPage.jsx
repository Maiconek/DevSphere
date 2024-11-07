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
        console.log(userProjects)
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
        <div className="profile-container bg-light">
            <div className="profile-info">
                <img src={searchedUser.imageUrl} className="profile-image"></img>  
                <h1>{searchedUser.firstName} {searchedUser.lastName}</h1>
                <p>Contact me at: {searchedUser.email}</p>
                {searchedUser.company ?
                    <p>Employed at: {searchedUser.company}</p>
                    :
                    <p>Not currently employed</p>
                }
                
                {searchedUser.email === user.sub ?
                <Link to={`/users/edit/${searchedUser.id}`}>
                    <button type="button" className="btn btn-primary me-2">Edit profile</button>
                </Link>
                :
                <></>
            }
            </div>
            <div className="profile-right-side">
                <div className="profile-bio">
                    <h2>About me</h2>
                    <p>{searchedUser.bio}</p>
                </div>
                {userProjects.length !== 0 ? 
                    <>
                        {searchedUser.email === user.sub  ?
                            <div className="profile-projects">
                                <h2>Your projects:</h2>
                                <Table 
                                    projects={userProjects}
                                    delete={deleteProject}    
                                />
                            </div>
                        : 
                            <div className="profile-projects">
                                <h2>You are not allowed</h2>
                            </div>
                        }
                    </>
                    :
                    <div className="profile-projects">
                        <h2>This user has no projects</h2>
                    </div> 
                }
                </div>
            </div>
        )
}

export default UserPage