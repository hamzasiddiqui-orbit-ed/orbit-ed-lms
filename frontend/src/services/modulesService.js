import { api } from "./api.config";

export const getAssignedModules = async (userId) => {
  const response = await api.post("modules/assigned-modules", {
    user_id: userId,
  });

  return response;
};

export const getModuleGeneralDetails = async (userId, moduleName) => {
  const response = await api.post("modules/module-general-details", {
    user_id: userId,
    module_name: moduleName,
  });

  return response;
};
