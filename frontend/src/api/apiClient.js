import axios from 'axios';

const API_URL = '/api'; // Proxy will handle the full URL

const apiClient = axios.create({
  baseURL: API_URL,
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
