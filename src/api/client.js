import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 120000,
})

export const indexRepo       = (payload) => api.post('/index', payload).then(r => r.data)
export const queryRepo       = (payload) => api.post('/query', payload).then(r => r.data)
export const generateDocs    = (payload) => api.post('/generate-docs', payload).then(r => r.data)
export const generateOnboarding = (payload) => api.post('/onboarding', payload).then(r => r.data)
export const checkHealth     = ()        => api.get('/health').then(r => r.data)

export default api
