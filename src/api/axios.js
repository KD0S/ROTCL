import axios from "axios";
const BASE_URL = 'https://rotcl-backend.onrender.com';

axios.defaults.withCredentials = true

export default axios.create({
    baseURL: BASE_URL
});
