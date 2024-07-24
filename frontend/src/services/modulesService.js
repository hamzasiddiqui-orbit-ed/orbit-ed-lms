import { api } from "./api.config";

export const getAssignedModules = async (userId) => {
    const response = await api.post("modules/assigned-modules", {
      user_id: userId,
    });
    
    return response;
  };