// API utility for making requests

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export const get = (endpoint) => apiCall(endpoint, { method: 'GET' });

export const post = (endpoint, data) =>
  apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const put = (endpoint, data) =>
  apiCall(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const delete_ = (endpoint) => apiCall(endpoint, { method: 'DELETE' });
