import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in requests
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }   return config;  
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;