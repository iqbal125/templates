import axios from 'axios';

const axiosBase = axios.create({
    baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosBase;