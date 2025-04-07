import axios from "axios";
import { getToken } from "../store/AuthContext";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000",
    timeout: 5000
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(
            error.response && error.response.data ? error.response.data : error.message
        );
    }
);

export default api;
