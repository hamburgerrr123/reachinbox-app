import { useState, useCallback } from 'react';

const BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (endpoint, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // Add any auth headers here
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const get = useCallback((endpoint) => request(endpoint), [request]);
  const post = useCallback((endpoint, body) => request(endpoint, 'POST', body), [request]);
  const put = useCallback((endpoint, body) => request(endpoint, 'PUT', body), [request]);
  const remove = useCallback((endpoint) => request(endpoint, 'DELETE'), [request]);

  return { get, post, put, remove, loading, error };
};