import { useContext, useEffect } from 'react';
import { useSessionReport } from "./useReports";
import { UserReportContext } from '../contexts/userReport.context';

export const useFormatReport = (userId, moduleName, sessionCount) => {
  const { dispatch: userReportDispatch } = useContext(UserReportContext);
  
  const { data, isLoading, isError, error, refetch } = useSessionReport(
    userId,
    moduleName,
    sessionCount
  );

  const rawData = data?.data ?? null;

  function formateDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  let reportData = null;

  

  useEffect(() => {
    console.log("useEffect in useFormatReport triggered", { rawData });
    if (rawData) {

      console.log("Dispatching actions", { 
        moduleName: reportData.moduleName, 
        sessionCount: reportData.sessionCount 
      });
      
      // userReportDispatch({ type: "SET_MODULE_NAME", payload: reportData.moduleName });
      userReportDispatch({ type: "SET_SESSION_COUNT", payload: reportData.sessionCount });
      
      const firstDerivedParameter = Object.keys(reportData.parameters.derived)[0];
      userReportDispatch({ type: "SET_DERIVED_PARAMETER", payload: firstDerivedParameter });
    }
  }, [rawData, userReportDispatch]);

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
      transcription: rawData.transcription,
      quiz: rawData.quiz,
      parameters: rawData.parameters,
      createdAt: formateDate(rawData.createdAt),
    };
  }

  console.log(reportData);

  return { reportData, isLoading, isError, error, refetch };
};