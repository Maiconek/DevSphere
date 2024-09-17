import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import UserCard from "./UserCard";
import Header from "./Header";


const UsersList = () => {
    const [users, setUsers] = useState([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            let response = await fetch('http://localhost:8080/api/v1/users', {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token.access_token,
                },
            })
            let data = await response.json()
            console.log(data)
            
            if(response.ok) {
                setUsers(data)
            }
            else {
                console.error('Błąd:', data);
            }
        } catch (error) {
            console.error('Blad polaczenia:',  error)
        }
    } 

    return (
        <div>
        <Header />
            <div className="container-fluid">
                <div className="row">
                    {users.map((item, index) => (
                        <UserCard
                        key={index}
                        email={item.email} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UsersList