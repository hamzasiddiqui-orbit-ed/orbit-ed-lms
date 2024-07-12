import { useQuery } from "@tanstack/react-query";
import * as reportsService from "../services/reportsService";

// Fetch the most recent user report
export const useMostRecentUserReport = (userId) => {
  return useQuery({
    queryKey: ["userReport", userId],
    queryFn: () => reportsService.getMostRecentReport(userId),
  });
};

export const useSessionReport = (userId, moduleName, sessionCount) => {
  return useQuery({
    queryKey: ["sessionReport", userId],
    queryFn: () =>
      reportsService.getSessionReport(userId, moduleName, sessionCount),
  });
};

export const useModuleFromReports = (userId) => {
  return useQuery({
    queryKey: ["modulesFromReports", userId],
    queryFn: () => reportsService.getModuleFromReports(userId),
  });
};

export const useModuleSessionsFromReports = (userId, moduleName) => {
  return useQuery({
    queryKey: ["moduleSessionsFromReports", userId, moduleName],
    queryFn: () =>
      reportsService.getModuleSessionsFromReports(userId, moduleName),
    enabled: !!moduleName, // Only run the query if moduleName is provided
  });
};
