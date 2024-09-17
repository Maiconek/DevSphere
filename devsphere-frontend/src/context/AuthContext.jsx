import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Stwórz kontekst
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Stan dla zalogowanego użytkownika
    // const [user, setUser] = useState(() => {
    //     // Pobieranie danych z localStorage przy pierwszym załadowaniu
    //     const userInStorage = localStorage.getItem('user');
    //     return userInStorage ? JSON.parse(userInStorage) : null;
    // });

    const [token, setToken] = useState(localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null);
   
    
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    // Synchronizacja ze stanem `localStorage` kiedy `user` się zmienia
    // useEffect(() => {
    //     if (user) {
    //         localStorage.setItem('user', JSON.stringify(user));
    //     } else {
    //         localStorage.removeItem('user');
    //     }
    // }, [user]);

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

            // Jeśli logowanie się powiedzie, ustaw użytkownika jako zalogowanego
            if (response.ok) {
                console.log('wchodze')
                // setUser(data);
                setToken(data);
                localStorage.setItem('authToken', JSON.stringify(data))
                console.log("Token", token);
                setIsLoggedIn(true);
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
                setIsLoggedIn(false)
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
                localStorage.setItem('authToken', JSON.stringify(data))
                console.log("Token", token);
            }
            else {
                console.error('Błąd logowania:', data);
            }
        } catch (error) {
                console.error('Błąd połączenia:', error);
            }
    }
    
    useEffect(() => {
        let time = 1000 * 60 * 2
        let interval = setInterval(() => {
            if(token) {
                refreshToken()
            }
        }, time)
        return () => clearInterval(interval)
    }, [token, loading])
    

    return (
        <AuthContext.Provider value={{ isLoggedIn, registerUser, loginUser, logoutUser, token, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};
