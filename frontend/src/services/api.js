import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)

// Add a response interceptor to handle common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)

export const auth = {
    login: async (credentials) => api.post("/auth/login", credentials),
    signup: async (credentials) => api.post("/auth/signup", credentials),
    updateProfile: async (data) => api.put("/auth/profile", data),
    getProfile: async () => api.get("/auth/profile"),
}

export default api;