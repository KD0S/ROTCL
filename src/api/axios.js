import axios from "axios";
import { config } from "../config";
const BASE_URL = `${config.SERVER_URL}`;

axios.defaults.withCredentials = true

export default axios.create({
    baseURL: BASE_URL
});
