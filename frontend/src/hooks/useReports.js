import { useQuery } from "@tanstack/react-query";
import * as reportsService from "../services/reportsService";

// Fetch the most recent user report
// expired (to be removed)
export const useMostRecentUserReport = (userId) => {
  return useQuery({
    queryKey: ["userReport", userId],
    queryFn: () => reportsService.getMostRecentReport(userId),
  });
};

export const useSessionReport = (userId, moduleName, sessionCount) => {
  console.log("Fetching reports! (useReports)");

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
    enabled: !!userId,
  });
};

export const useModuleSessionsFromReports = (userId, moduleName) => {
  return useQuery({
    queryKey: ["moduleSessionsFromReports", userId, moduleName],
    queryFn: () =>
      reportsService.getModuleSessionsFromReports(userId, moduleName),
    enabled: !!userId && !!moduleName, // Only run the query if moduleName is provided
  });
};

export const useSessionReportGeneral = (userId, moduleName, sessionCount) => {
  return useQuery({
    queryKey: ["sessionReportGeneral", userId, moduleName, sessionCount],
    queryFn: () =>
      reportsService.getSessionReportGeneral(userId, moduleName, sessionCount),
    enabled: !!userId,
  });
};

export const useSessionReportMisc = (reportId) => {
  return useQuery({
    queryKey: ["sessionReportMisc", reportId],
    queryFn: () => reportsService.getSessionReportMisc(reportId),
    enabled: !!reportId,
  });
};

export const useSessionReportDerivedParameters = (reportId) => {
  return useQuery({
    queryKey: ["sessionReportDerivedParameters", reportId],
    queryFn: () => reportsService.getSessionReportDerivedParamters(reportId),
    enabled: !!reportId,
  });
};

export const useBaseParametersFromDerived = (reportId, derivedParameter) => {
  return useQuery({
    queryKey: ["baseParameters", reportId, derivedParameter],
    queryFn: () =>
      reportsService.getBaseParametersFromDerived(reportId, derivedParameter),
    enabled: !!reportId && !!derivedParameter,
  });
};

export const useDerivedParameterDetail = (reportId, derivedParameter) => {
  return useQuery({
    queryKey: ["derivedParameterDetail", reportId, derivedParameter],
    queryFn: () =>
      reportsService.getDerivedParameterDetail(reportId, derivedParameter),
    enabled: !!reportId && !!derivedParameter,
  });
};
