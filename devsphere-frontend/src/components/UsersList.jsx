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
        <div className="album py-5 bg-body-teritiary">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {users.map((item) => (
                        <UserCard
                        key={item.id}
                        id={item.id}
                        email={item.email}
                        firstName={item.firstName}
                        lastName={item.lastName}
                        image={item.imageUrl} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UsersList