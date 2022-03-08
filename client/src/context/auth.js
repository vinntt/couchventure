import React, { useState, useEffect } from "react";
import service from "../api/service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = token => {
        // store this token in local storage
        localStorage.setItem('authToken', token);
    };

    const logoutUser = () => {
        // remove the token from local storage
        localStorage.removeItem('authToken');
        // update the state
        setIsLoggedIn(false);
        setUser(null);
    }

    const verifyStoredToken = () => {
        // check local storage
        const storedToken = localStorage.getItem('authToken')

        if (storedToken) {
            // Change: by adding this return we now return a promise
            return service.get('/auth/verify')
                .then(response => {
                    const user = response.data
                    setUser(user)
                    setIsLoggedIn(true)
                    setIsLoading(false)
                })
                .catch(err => {
                    // the token is invalid
                    setIsLoggedIn(false)
                    setUser(null)
                    setIsLoading(false)
                })
        } else {
            // there is no token in local storage
            setIsLoading(false)
        }
    };

    useEffect(() => {
        // check if we have an auth token stored
        verifyStoredToken()
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, isLoading, storeToken, verifyStoredToken, logoutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };
