import { api } from "./api.config";

export const updateUserProfile = async (userData) =>
  api.post("users/update-user-profile", userData);

export const changePassword = async (passwordData) =>
  api.post("users/change-password", passwordData);