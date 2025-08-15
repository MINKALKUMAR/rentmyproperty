// api.js
import axios from 'axios';

const API_URL = 'https://rentmyproperty-backend.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simple in-memory response cache
const responseCache = new Map();

/**
 * Fetch properties with optional filters and caching
 */
export const getProperties = async (filters = {}, cancelToken) => {
  const cacheKey = JSON.stringify(filters);

  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }

  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const response = await api.get(`/properties?${params.toString()}`, {
      cancelToken: cancelToken?.token,
    });

    responseCache.set(cacheKey, response.data);

    return response.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error('Error fetching properties:', error.response?.data || error.message);
    }
    throw error;
  }
};

/**
 * Fetch filter options
 */
export const getLocations = async () => {
  try {
    const response = await api.get('/filters/locations');
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error.response?.data || error.message);
    throw error;
  }
};

export const getPropertyTypes = async () => {
  try {
    const response = await api.get('/filters/property-types');
    return response.data;
  } catch (error) {
    console.error('Error fetching property types:', error.response?.data || error.message);
    throw error;
  }
};

export const getOccupancyTypes = async () => {
  try {
    const response = await api.get('/filters/occupancy-types');
    return response.data;
  } catch (error) {
    console.error('Error fetching occupancy types:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Admin login
 */
export const adminLogin = async (credentials) => {
  try {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
