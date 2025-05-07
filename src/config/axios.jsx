import axios from "axios";
import API_BASE_URL from "./config";

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  const name = 'csrftoken';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2){
    return(parts.pop().split(';').shift());
  }
  console.log("No token found");
  return null;
};

const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
    accept: "application/json",
    "X-CSRFToken": getCSRFToken(),  // Include CSRF token in the header
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
    
    // Add CSRF token for each request
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
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
