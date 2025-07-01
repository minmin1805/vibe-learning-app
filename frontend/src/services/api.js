import axios from "axios";

const api = axios.create({
  baseURL: import.meta.mode === "development" ? import.meta.env.VITE_API_URL : "/api",
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

export const journal = {
  getJournals: async () => await api.get("/journal"),
  getJournalById: async (id) => await api.get(`/journal/${id}`),
  updateJournal: async (id, entry) => await api.put(`/journal/${id}`, { entry }),
  getEntries: async (id) => await api.get(`/journal/${id}/entries`),
  createEntry: async (id, data) => await api.post(`/journal/${id}/entries`, data),
  updateEntry: async (journalId, entryId, newEntryTitle, newEntryContent) => await api.put(`/journal/${journalId}/entries/${entryId}`, { newEntryTitle, newEntryContent }),
  deleteEntry: async (journalId, entryId) => await api.delete(`/journal/${journalId}/entries/${entryId}`),
}


export default api;