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

export const getSessionReportGeneral = async (
  userId,
  moduleName,
  sessionCount
) =>
  api.post("reports/session-report-general", {
    user_id: userId,
    module_name: moduleName,
    session_count: sessionCount,
  });

export const getSessionReportMisc = async (reportId) => {
  const response = await api.post("reports/session-report-misc", {
    report_id: reportId,
  });

  return response;
};

export const getSessionReportDerivedParamters = async (reportId) => {
  const response = await api.post("reports/session-report-derived-parameters", {
    report_id: reportId,
  });

  return response;
};

export const getBaseParametersFromDerived = async (
  reportId,
  derivedParameter
) => {
  const response = await api.post("reports/base-parameters-from-derived", {
    report_id: reportId,
    derived_parameter: derivedParameter,
  });

  return response;
};

export const getDerivedParameterDetail = async (reportId, derivedParameter) => {
  console.log("derived parameter detail called.");
  
  const response = await api.post("reports/derived-parameter-detail", {
    report_id: reportId,
    derived_parameter: derivedParameter,
  });

  console.log(`derived parameter: ${response}`);

  return response;
};
