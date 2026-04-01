import axios, { type InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Extend config type for retry flag
interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// --- Request interceptor: attach access token ---
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response interceptor: auto-refresh on 401 ---
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryConfig;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Don't retry auth endpoints
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // Single refresh promise — all concurrent 401s wait for same refresh
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          const refreshToken = localStorage.getItem("refresh_token");
          if (!refreshToken) throw new Error("No refresh token");

          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });

          const newAccess: string = data.access;
          localStorage.setItem("access_token", newAccess);
          if (data.refresh) {
            localStorage.setItem("refresh_token", data.refresh);
          }
          return newAccess;
        } catch (refreshError) {
          const hadToken = !!localStorage.getItem("access_token");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          if (hadToken) {
            window.location.href = "/login";
          }
          throw refreshError;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();
    }

    try {
      const newToken = await refreshPromise!;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return client(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export default client;
