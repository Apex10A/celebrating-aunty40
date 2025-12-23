import axios from "axios";

const api = axios.create({
  baseURL: "https://anniversary-backend-zm7u.onrender.com/api",
});

// https://localhost:3000/api
// api.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(localStorage.getItem("session"))?.access_token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;

// https://api.qrserver.com/v1/create-qr-code/?data=https://anniversary01.vercel.app
