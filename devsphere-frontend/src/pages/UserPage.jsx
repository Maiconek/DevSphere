import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const UserPage = () => {
    const [searchedUser, setSearchedUser] = useState('')
    const {token, user} = useContext(AuthContext)
    const params = useParams()
    const id = params.id

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
            setSearchedUser(data)
        }
        catch(error) {
            console.log('Blad polaczenia: ', error)
        }
    }

    return (
        <div>
        <Header />
            <h1>{searchedUser.firstName} {searchedUser.lastName}</h1>
            <p>{searchedUser.email}</p>
            {searchedUser.email === user.sub ?
                <button type="button" className="btn btn-primary">Edit</button>
                :
                <></>
            }
        </div>
    )
}

export default UserPage