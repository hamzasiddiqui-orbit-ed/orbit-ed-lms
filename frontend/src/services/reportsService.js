import { api } from "./api.config";

export const getMostRecentReport = async (userId) =>
  api.post("reports/getMostRecentUserReport", { user_id: userId });
