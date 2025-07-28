import apiClient from './apiClient';

const llmApi = {
  optimizePrompt: async (prompt, model = 'gemini-pro', options = {}) => {
    const response = await apiClient.post('/optimize/4d', { prompt, model, options });
    return response.data;
  },
};

export default llmApi;