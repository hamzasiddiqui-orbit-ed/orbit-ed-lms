import { useMostRecentUserReport, useSessionReport } from "./useReports";

export const useFormatReport = (userId, moduleName, sessionCount) => {
  const { data, isLoading, isError, error, refetch } = useSessionReport(
    userId,
    moduleName,
    sessionCount
  );

  const rawData = data?.data ?? null;

  let reportData = null;

  function formateDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  if (rawData) {
    reportData = {
      userId: rawData.user_id,
      moduleName: rawData.module_name,
      sessionCount: rawData.session_count,
      deviceName: rawData.device_name,
      totalWordCount: rawData.total_word_count,
      totalTime: rawData.total_time,
      totalScore: rawData.total_score,
      audioUrl: rawData.audio_url,
      quizScore: rawData.quiz_score,
      parameters: rawData.parameters,
      createdAt: formateDate(rawData.createdAt),
    };
  }

  console.log(reportData);

  return { reportData, isLoading, isError, error, refetch };
};
