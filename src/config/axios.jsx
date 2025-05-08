import axios from "axios";
import API_BASE_URL from "./config";


const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
    accept: "application/json",
  },
  withCredentials: true,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      config.headers.Authorization = ``;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("Token");
      // Optional: reload page or redirect to login
      window.location.reload(); // or use navigate('/login') if using react-router-dom
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
