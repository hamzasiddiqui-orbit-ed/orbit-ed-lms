import { useMostRecentUserReport } from './useReports';

export const useFormatReport = (userId) => {
    const { data, isLoading, isError, error } = useMostRecentUserReport(userId);
  
    const rawData = data?.data[0] ?? null;
  
    let reportData = null;
  
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
        createdAt: rawData.createdAt,
      };
    }
  
    console.log(reportData);
  
    return { reportData, isLoading, isError, error };
  };