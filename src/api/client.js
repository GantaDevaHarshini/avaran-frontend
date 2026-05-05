import axios from "axios";

const api = axios.create({
  baseURL: "https://avaran-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;