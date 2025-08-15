// src/api.js
import axios from 'axios';

const API_URL = 'https://rentmyproperty-backend.onrender.com'; // Update with your backend URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const login = async (email, password) => {
  const response = await api.post('/properties/admin/login', { email, password });
  return response.data;
};

// Property API
export const getProperties = async () => {
  const response = await api.get('/properties');
  return response.data;
};

export const getProperty = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

// src/api.js
export const createProperty = async (formData) => {
  try {
    const response = await api.post('/properties', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('API Error Details:', {
      message: error.message,
      response: error.response?.data,
      config: error.config
    });
    throw error;
  }
};

// src/api.js
// Add this to your axios instance
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);


export const updateProperty = async (id, formData) => {
  try {
    const response = await api.put(`/properties/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Update property error:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};


// Filter API
export const getLocations = async () => {
  const response = await api.get('/filters/locations');
  return response.data;
};

export const getLocation = async (id) => {
  const response = await api.get(`/filters/locations/${id}`);
  return response.data;
};

export const createLocation = async (data) => {
  const response = await api.post('/filters/locations', data);
  return response.data;
};

export const updateLocation = async (id, data) => {
  const response = await api.put(`/filters/locations/${id}`, data);
  return response.data;
};

export const deleteLocation = async (id) => {
  const response = await api.delete(`/filters/locations/${id}`);
  return response.data;
};

export const getPropertyTypes = async () => {
  const response = await api.get('/filters/property-types');
  return response.data;
};

export const getPropertyType = async (id) => {
  const response = await api.get(`/filters/property-types/${id}`);
  return response.data;
};

export const createPropertyType = async (data) => {
  const response = await api.post('/filters/property-types', data);
  return response.data;
};

export const updatePropertyType = async (id, data) => {
  const response = await api.put(`/filters/property-types/${id}`, data);
  return response.data;
};

export const deletePropertyType = async (id) => {
  const response = await api.delete(`/filters/property-types/${id}`);
  return response.data;
};

export const getOccupancyTypes = async () => {
  const response = await api.get('/filters/occupancy-types');
  return response.data;
};

export const getOccupancyType = async (id) => {
  const response = await api.get(`/filters/occupancy-types/${id}`);
  return response.data;
};

export const createOccupancyType = async (data) => {
  const response = await api.post('/filters/occupancy-types', data);
  return response.data;
};

export const updateOccupancyType = async (id, data) => {
  const response = await api.put(`/filters/occupancy-types/${id}`, data);
  return response.data;
};

export const deleteOccupancyType = async (id) => {
  const response = await api.delete(`/filters/occupancy-types/${id}`);
  return response.data;
};

export default api;
