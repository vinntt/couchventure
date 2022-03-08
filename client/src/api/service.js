import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:5005"
});

service.interceptors.request.use(
    request => {
        const storedToken = localStorage.getItem('authToken')

        if (storedToken) {
            request.headers.Authorization = `Bearer ${storedToken}`
        }

        return request
    }
);

export default service;
