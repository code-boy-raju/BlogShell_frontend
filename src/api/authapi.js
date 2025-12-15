import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ===== AUTH APIS =====

// signup
export const authorSignupApi = (data) =>
  API.post("/user/authorsignup", data);

export const adminSignupApi = (data) =>
  API.post("/user/adminsignup", data);

// login
export const loginApi = (data) =>
  API.post("/user/login", data);

// forgot/reset
export const forgotPasswordApi = (data) =>
  API.post("/user/forgot-password", data);

export const resetPasswordApi = (token, data) =>
  API.post(`/user/reset-password/${token}`, data);

export default API;
