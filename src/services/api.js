import axios from 'axios';
const isProd = false;
// Base URL configuration (Update with your actual backend URL)
const API_URL = isProd ? 'https://pathikx.net' : 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminParams'); // Using 'adminParams' to mimic existing app generic naming, or just 'token'
        if (token) {
            // Assuming token is stored as JSON or string. Adjust as needed.
            // For now, let's assume simple string or parsed object
            // config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
