import axios from "axios";
import { BACKEND_API } from "../../config.local";

// You can set this based on your environment or a configuration setting
const useLocalhost = false; // Set to false to use the IP address

// To be updated later on

// export const api = axios.create({
//   baseURL: useLocalhost ? BACKEND_API.LOCAL : BACKEND_API.IP,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const api = axios.create({
  baseURL: BACKEND_API.IP,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});