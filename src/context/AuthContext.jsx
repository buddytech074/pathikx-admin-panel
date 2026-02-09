import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved token/user on load
        const savedUser = localStorage.getItem('adminUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (phone, password) => {
        // Placeholder logic for now, connecting to real endpoint later
        // const response = await api.post('/auth/login', { phone, password });
        // if (response.data.role === 'ADMIN') ...

        console.log("Logging in...", phone);

        // MOCK LOGIN FOR DEVELOPMENT
        if (phone === '9999999999' && password === 'admin') {
            const mockUser = { name: 'Admin User', role: 'ADMIN', token: 'mock-token' };
            setUser(mockUser);
            localStorage.setItem('adminUser', JSON.stringify(mockUser));
            localStorage.setItem('adminToken', mockUser.token);
            return { success: true };
        }

        return { success: false, message: 'Invalid Credentials' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
