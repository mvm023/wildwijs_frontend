const isDevelopment = import.meta.env.MODE === 'development'
const API_BASE_URL = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY

export default API_BASE_URL;