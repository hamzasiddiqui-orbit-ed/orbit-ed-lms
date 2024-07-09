import axios from "axios";
import { BACKEND_API } from "../../config.local";

export const api = axios.create({
  baseURL: BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});
