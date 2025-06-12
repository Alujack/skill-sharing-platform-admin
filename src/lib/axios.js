import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/v1',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Add a request interceptor to include the token if it exists
// axiosInstance.interceptors.request.use(
//   (config) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (err) {
//       console.warn('Could not access localStorage:', err);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
