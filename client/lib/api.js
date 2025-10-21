import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// API functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.post('/auth/change-password', data),
};

export const applicationsAPI = {
  submit: (data) => api.post('/applications', data),
  getAll: (params) => api.get('/applications', { params }),
  getById: (id) => api.get(`/applications/${id}`),
  updateStatus: (id, data) => api.put(`/applications/${id}/status`, data),
  delete: (id) => api.delete(`/applications/${id}`),
};

export const consultationsAPI = {
  book: (data) => api.post('/consultations', data),
  getAll: (params) => api.get('/consultations', { params }),
  getById: (id) => api.get(`/consultations/${id}`),
  updateStatus: (id, data) => api.put(`/consultations/${id}/status`, data),
  delete: (id) => api.delete(`/consultations/${id}`),
};

export const inquiriesAPI = {
  submit: (data) => api.post('/inquiries', data),
  getAll: (params) => api.get('/inquiries', { params }),
  getById: (id) => api.get(`/inquiries/${id}`),
  reply: (id, data) => api.put(`/inquiries/${id}/reply`, data),
  updateStatus: (id, data) => api.put(`/inquiries/${id}/status`, data),
  delete: (id) => api.delete(`/inquiries/${id}`),
};

export const countriesAPI = {
  getAll: (params) => api.get('/countries', { params }),
  getById: (id) => api.get(`/countries/${id}`),
  create: (data) => api.post('/countries', data),
  update: (id, data) => api.put(`/countries/${id}`, data),
  delete: (id) => api.delete(`/countries/${id}`),
};

export const visaTypesAPI = {
  getAll: (params) => api.get('/visa-types', { params }),
  getById: (id) => api.get(`/visa-types/${id}`),
  create: (data) => api.post('/visa-types', data),
  update: (id, data) => api.put(`/visa-types/${id}`, data),
  delete: (id) => api.delete(`/visa-types/${id}`),
};

export const blogAPI = {
  getAll: (params) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
};

export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  submit: (data) => api.post('/testimonials', data),
  getAdmin: (params) => api.get('/testimonials/admin', { params }),
  approve: (id, data) => api.put(`/testimonials/${id}/approve`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

export default api;
