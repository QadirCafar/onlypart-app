import axios from "axios";
import { authStorage } from "../storage/authStorage";

export const api = axios.create({
  baseURL: "https://autopart-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await authStorage.getToken();

    console.log("API REQUEST:", {
      method: config.method,
      baseURL: config.baseURL,
      url: config.url,
      fullUrl: `${config.baseURL ?? ""}${config.url ?? ""}`,
      hasToken: !!token,
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log("API RESPONSE:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });

    return response;
  },
  async (error) => {
    console.log("API ERROR:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      baseURL: error.config?.baseURL,
      url: error.config?.url,
      fullUrl: `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`,
    });

    if (error.response?.status === 401) {
      await authStorage.clear();
    }

    return Promise.reject(error);
  }
);