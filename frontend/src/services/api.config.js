import axios from "axios";
import { BACKEND_API } from "../../config.local";

// You can set this based on your environment or a configuration setting
const useLocalhost = false; // Set to false to use the IP address

// export const api = axios.create({
//   baseURL: useLocalhost ? BACKEND_API.LOCAL : BACKEND_API.IP,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});