import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Stwórz kontekst
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    // Funkcja rejestracji użytkownika
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('http://localhost:8080/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'firstName': e.target.firstname.value,
                    'lastName': e.target.lastname.value,
                    'password': e.target.password.value,
                    'email': e.target.email.value,
                }),
            });

            // let data = await response.json();
            // console.log('Rejestracja: ', data);

            // Jeśli rejestracja się powiedzie, ustaw użytkownika jako zalogowanego
            if (response.ok) {
                console.log('ok')
                navigate("/login")
            } else {
                console.error('Błąd rejestracji:', data);
            }
        } catch (error) {
            console.error('Błąd połączenia:', error);
        }
    };

    // Funkcja logowania użytkownika
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': e.target.email.value,
                    'password': e.target.password.value,
                }),
            });

            let data = await response.json();
            console.log('Logowanie: ', data);
            console.log("Access token", data.access_token)
            // console.log('Decode', jwtDecode(data.access_token))

            // Jeśli logowanie się powiedzie, ustaw użytkownika jako zalogowanego
            if (response.ok) {
                setToken(data)
                localStorage.setItem('authToken', JSON.stringify(data))
                console.log("Token", token);
                setUser(jwtDecode(data.access_token))
                navigate("/")
            } else {
                console.error('Błąd logowania:', data);
            }
        } catch (error) {
            console.error('Błąd połączenia:', error);
        }
    };

    // Funkcja wylogowania użytkownika
    const logoutUser = async () => {
        try {
            let response = await fetch('http://localhost:8080/api/v1/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.access_token
                },
                
            });

             // Jeśli rejestracja się powiedzie, ustaw użytkownika jako zalogowanego
            if (response.ok) {
                console.log('ok')
                localStorage.removeItem('authToken')
                setUser(null)
                navigate("/login")
            } else {
                console.error('Błąd:', data);
            }
        } catch (error) {
            console.error('Błąd połączenia:', error);
        }      
    };

    const refreshToken = async () => {
        try {
            let response = await fetch('http://localhost:8080/api/v1/auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.refresh_token
                },
            });
            let data = await response.json();

            if(response.ok) {
                setToken(data)
                setUser(jwtDecode(data.access_token))
                localStorage.setItem('authToken', JSON.stringify(data))
                console.log("Token", token);
                console.log("User", user)
                
            }
            else {
                console.error('Błąd logowania:', data);
            }
        } catch (error) {
                console.error('Błąd połączenia:', error);
            }
    }
    
    useEffect(() => {
        let time = 1000 * 60 * 10
        let interval = setInterval(() => {
            if(token) {
                refreshToken()
            }
        }, time)
        return () => clearInterval(interval)
    }, [token, loading])

    useEffect(() => {
        if (token) {
            // const decodedToken = jwtDecode(token.access_token);
            // setUser(decodedToken);
            // console.log("User", user)
            // console.log("Detail", user.sub)
        }
    }, [token]); 
    

    return (
        <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser, token, refreshToken, loggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
};
