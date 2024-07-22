import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useSessionReportMisc } from "../hooks/useReports";
import TranscriptionCollapsable from "./TranscriptionCollapsable";
import { IoIosArrowForward } from "react-icons/io";

const SessionReportRightCol = () => {
  const { reportId } = useContext(SessionReportContext);

  const {
    data: reportMisc,
    isPending,
    isError,
  } = useSessionReportMisc(reportId);

  if (isPending) {
    return (
      <div className="flex w-3/12 flex-col gap-4 me-5">
        <div className="skeleton h-10 w-28"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading report data</div>;
  }

  if (!reportMisc) {
    return <div>No report data available</div>;
  }

  return (
    <div className="w-3/12 text-start me-5">
      <div className="mb-8">
        <h2 className="text-brand font-semibold text-2xl mb-2">
          Quiz Performance
        </h2>
        {reportMisc.data.quiz && (
          <>
            <p className="text-utility text-sm">
              You scored {reportMisc.data.quiz.score}% on the quiz.
            </p>
            <a className="link link-hover text-xs text-utility flex items-center mt-1">
              View Details
              <IoIosArrowForward className="ml-1" />
            </a>
          </>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-brand font-semibold text-2xl mb-2">
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

      <div>
        <h2 className="text-brand font-semibold text-2xl mb-2">Useful Tips</h2>
        <div className="card bg-[#C6CFEE] shadow-xl border-r-2 border-b-2">
          <div className="card-body">
            <h3 className="card-title">Insight No. 1</h3>
            <p>If a dog chews shoes whose shoes does he choose?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionReportRightCol;
