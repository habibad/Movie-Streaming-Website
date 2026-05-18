import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT if stored
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bt_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Generic typed GET helper
export async function get<T>(url: string): Promise<T> {
  const res: AxiosResponse<T> = await api.get(url);
  return res.data;
}

// Generic typed POST helper
export async function post<T, B = unknown>(url: string, body: B): Promise<T> {
  const res: AxiosResponse<T> = await api.post(url, body);
  return res.data;
}

export default api;
