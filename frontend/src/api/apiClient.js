import axios from 'axios';

// Use environment variable for the backend URL.
// The VITE_API_URL should be the base address, e.g., 'http://localhost:5000'
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`, // Construct the full base URL with /api
});

// Interceptor to add the auth token to every request
apiClient.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

// Auth endpoints
export const registerUser = (userData) => apiClient.post('/users', userData);
export const loginUser = (userData) => apiClient.post('/users/login', userData);

// Project endpoints
export const getProjects = () => apiClient.get('/projects');
export const createProject = (projectData) => apiClient.post('/projects', projectData);
export const getProjectById = (id) => apiClient.get(`/projects/${id}`);
export const updateProject = (id, projectData) => apiClient.put(`/projects/${id}`, projectData);
export const deleteProject = (id) => apiClient.delete(`/projects/${id}`);

// LLM Gateway endpoints (placeholder)
export const optimizePrompt = (promptData) => apiClient.post('/llm/optimize', promptData);

export default apiClient;
