import axios from "axios";
import { BACKEND_API } from "../../config.local";

export const api = axios.create({
  baseURL: BACKEND_API,
  // Send requests with credentials (JWT token)
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
