import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useSessionReportMisc } from "../hooks/useReports";
import TranscriptionCollapsable from "./TranscriptionCollapsable";
import BaseParameterChart from "./BaseParameterChart";
import { IoIosArrowForward } from "react-icons/io";
import UsefulTip from "./UsefulTip";

const SessionReportRightCol = () => {
  const { reportId, baseParameter, setShowQuiz } = useContext(SessionReportContext);

  const {
    data: reportMisc,
    isPending,
    isError,
  } = useSessionReportMisc(reportId);

  if (isPending) {
    return (
      <div className="flex w-3/12 flex-col gap-4 me-5">
        <div className="skeleton bg-slate-200 h-10 w-28"></div>
        <div className="skeleton bg-slate-200 h-8 w-full"></div>
        <div className="skeleton bg-slate-200 h-8 w-full"></div>
        <div className="skeleton bg-slate-200 h-60 w-full"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading report data</div>;
  }

  if (!reportMisc) {
    return <div className="w-3/12 me-5">No report data available</div>;
  }

  if (baseParameter) {
    return <BaseParameterChart />
  }

  const handleQuizDetailsOpen = () => {
    setShowQuiz(true)
  }

  return (
    <div className="w-3/12 text-start me-5">
      <div className="mb-8">
        <h2 className="text-headingDark font-semibold text-2xl mb-2">
          Quiz Performance
        </h2>
        {reportMisc.data.quiz && (
          <>
            <p className="text-textLight text-sm">
              You scored {reportMisc.data.quiz.score}% on the quiz.
            </p>
            <button className="link link-hover text-xs text-utility flex items-center mt-1 hover:text-brand" onClick={handleQuizDetailsOpen}>
              View Details
              <IoIosArrowForward className="ml-1" />
            </button>
          </>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-headingDark font-semibold text-2xl mb-2">
          Audio Preview
        </h2>
        <div className="bg-[#D2D2D2] p-4 rounded-lg mb-2">
          {/* Replace this with your actual audio player component */}
          <div className="text-center">Audio Play Coming Soon!</div>
        </div>
        {reportMisc.data.transcription && (
          <TranscriptionCollapsable
            transcription={reportMisc.data.transcription}
          />
        )}
      </div>

      <UsefulTip />
    </div>
  );
};

export default SessionReportRightCol;
