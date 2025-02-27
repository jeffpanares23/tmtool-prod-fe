import axios from "axios";

// Set up a base URL for your backend API
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/login", // Update with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Export functions for API calls
export const login = (credentials) => apiClient.post("/", credentials);

export default apiClient;
