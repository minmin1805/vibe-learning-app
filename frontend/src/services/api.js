import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    }
})

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor to handle common errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

export const auth = {
    login: async (credentials) => api.post("/auth/login", credentials),
    signup: async (credentials) => api.post("/auth/signup", credentials),
    updateProfile: async (data) => api.put("/auth/profile", data),
    getProfile: async () => api.get("/auth/profile"),
}

export const content = {
  processUrl: async (url) => api.post("/content/process-url", { url }),
  processPdf: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/content/process-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  processYoutube: async (youtubeUrl) => api.post("/content/process-youtube", { youtubeUrl }),
}

export const lesson = {
  generateLessons: async (contentId) => await api.post("/lesson/generate", { contentId }),
  getLessons: async () => await api.get("/lesson"),
  getLessonById: async (id) => await api.get(`/lesson/${id}`),
}

export default api;