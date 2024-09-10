import React, { createContext, useState, useEffect } from 'react';

// Stwórz kontekst
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Stan dla zalogowanego użytkownika
    const [user, setUser] = useState(() => {
        // Pobieranie danych z localStorage przy pierwszym załadowaniu
        const userInStorage = localStorage.getItem('user');
        return userInStorage ? JSON.parse(userInStorage) : null;
    });
    
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    // Synchronizacja ze stanem `localStorage` kiedy `user` się zmienia
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Funkcja rejestracji użytkownika
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'password': e.target.password.value,
                    'firstName': e.target.firstname.value,
                    'lastName': e.target.lastname.value,
                    'email': e.target.email.value,
                }),
            });

            let data = await response.json();
            console.log('Rejestracja: ', data);

            // Jeśli rejestracja się powiedzie, ustaw użytkownika jako zalogowanego
            if (response.ok) {
                console.log('ok')
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
            let response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'password': e.target.password.value,
                }),
            });

            let data = await response.json();
            console.log('Logowanie: ', data);

            // Jeśli logowanie się powiedzie, ustaw użytkownika jako zalogowanego
            if (response.ok) {
                setUser(data);
                setIsLoggedIn(true);
            } else {
                console.error('Błąd logowania:', data);
            }
        } catch (error) {
            console.error('Błąd połączenia:', error);
        }
    };

    // Funkcja wylogowania użytkownika
    const logoutUser = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user'); // Usuwanie z localStorage
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, registerUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
