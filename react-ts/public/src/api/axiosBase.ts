import axios from 'axios';


const baseURL = 'https://jsonplaceholder.typicode.com'

const axiosBase = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosBase;