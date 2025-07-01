// import axios from 'axios';
// // import {store} from '../app/store';


// const axiosInstance = axios.create({
//   baseURL: '/api',
// });

// axiosInstance.interceptors.request.use((config) => {
//   const state = store.getState();
//   const token = state.auth.token;
//   if (token) config.headers.Authorization = token;
//   return config;
// });

// export default axiosInstance;

// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: '/api',
// });

// export default axiosInstance;import axios from 'axios';
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('persist:root'))?.auth;
    if (token) {
      const parsed = JSON.parse(token);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
