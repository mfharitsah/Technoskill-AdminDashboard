// context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Buat context
const UserContext = createContext();

// Buat provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     // Ambil data dari local storage saat aplikasi dimuat
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    //     console.log("di context" + storedUser);
    // }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Buat custom hook
export const useUser = () => useContext(UserContext);
