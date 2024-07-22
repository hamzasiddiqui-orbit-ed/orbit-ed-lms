import { useSessionReportGeneral } from "./useReports";

export const useFormatReportGeneral = (userId, moduleName, sessionCount) => {
  const { data, isPending, isError, refetch } = useSessionReportGeneral(
    userId,
    moduleName,
    sessionCount
  );

  const rawData = data?.data ?? null;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  let reportData = null;

  if (rawData) {
    reportData = {
      reportId: rawData._id,
      moduleName: rawData.module_name,
      sessionCount: rawData.session_count,
      totalScore: rawData.total_score,
      createdAt: formatDate(rawData.createdAt),
    };
  }

  console.log(reportData);

  return { reportData, isPending, isError, refetch };
};