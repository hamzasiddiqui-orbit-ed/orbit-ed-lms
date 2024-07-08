import { api } from "./api.config";

export const login = async (data) => api.post("users/login", data);
export const logout = async () => api.post("users/logout");
