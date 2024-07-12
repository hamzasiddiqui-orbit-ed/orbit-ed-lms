import { api } from "./api.config";

export const getMostRecentReport = async (userId) =>
  api.post("reports/getMostRecentUserReport", { user_id: userId });

export const getSessionReport = async (userId, moduleName, sessionCount) =>
  api.post("reports/getSessionReport", {
    user_id: userId,
    module_name: moduleName,
    session_count: sessionCount,
  });

export const getModuleFromReports = async (userId) =>
  api.post("reports/getUniqueModulesFromReports", { user_id: userId });

export const getModuleSessionsFromReports = async (userId, moduleName) => {
  const response = await api.post("reports/getModuleSessionsFromReport", {
    user_id: userId,
    module_name: moduleName,
  });
  return response;
};
