import axios from "axios"
import API_BASE_URL from "./config"

const AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers:{
        "Content-type": "application/json",
        accept: "application/json"
    }
})

export default AxiosInstance