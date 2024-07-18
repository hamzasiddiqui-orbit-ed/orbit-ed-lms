import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user.context";
import { useFormatReport } from "../hooks/useFormatReport";
import {
  useModuleFromReports,
  useModuleSessionsFromReports,
} from "../hooks/useReports";
import SkeletonUserReport from "./SkeletonUserReport";
import DropdownUserReport from "../components/DropdownUserReport";
import RadialProgressUserReport from "./RadialProgressUserReport";
import TranscriptionCollapsable from "./TranscriptionCollapsable";
import ScrollableTabs from "./ScrollableTabs";
import { IoIosArrowForward } from "react-icons/io";

export default function UserReport() {
  const [queryModuleName, setQueryModuleName] = useState(null);
  const [querySessionCount, setQuerySessionCount] = useState(null);

  const { state: userState } = useContext(UserContext);
  const userId = userState.user._id;

  const {
    reportData,
    isLoading,
    isError,
    error,
    refetch: refetchReport,
  } = useFormatReport(userId, queryModuleName, querySessionCount);

  useEffect(() => {
    if (queryModuleName || querySessionCount) {
      refetchReport();
    }
  }, [queryModuleName, querySessionCount, refetchReport]);

  const {
    data: moduleData,
    refetch: refetchModules,
    isLoading: isModuleLoading,
    isError: isModuleError,
    error: moduleError,
  } = useModuleFromReports(userId);

  const {
    data: sessionData,
    refetch: refetchSessions,
    isLoading: isSessionLoading,
    isError: isSessionError,
    error: sessionErro,
  } = useModuleSessionsFromReports(userId, queryModuleName);

  const handleModuleClick = async () => {
    await refetchModules();
    console.log(`MODULES: ${moduleData}`);
  };

  const handleModuleSelect = (moduleName) => {
    setQueryModuleName(moduleName);
    setQuerySessionCount(null);
  };

  const handleSessionClick = async () => {
    await refetchSessions();
    console.log(`SESSION COUNTS: ${sessionData}`);
  };

  const handleSessionSelect = (sessionCount) => {
    setQuerySessionCount(sessionCount);
  };

  if (isLoading) return <SkeletonUserReport />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!reportData) return <div>No report data available</div>;

  return (
    <div className="w-full h-full pe-5 mt-28">
      {/* Top section */}
      <div className="flex items-start mb-12 ps-5">
        <div className="w-full">
          <h1 className="text-3xl font-medium text-brand mb-4 ps-2 text-start">
            Module Performance
          </h1>
          <div className="mb-4 text-start">
            <DropdownUserReport
              title={reportData.moduleName}
              dropDownData={moduleData?.data || []}
              handleDropDownExpand={handleModuleClick}
              handleDropDownSelect={handleModuleSelect}
              sessions={false}
            />
          </div>
          <div className="flex items-center">
            <div className="btn btn-sm bg-core border-0 shadow-core text-utility text-base font-normal">
              {reportData.createdAt}
            </div>
            <div className="ml-8">
              <DropdownUserReport
                title={`Session count: ${reportData.sessionCount}`}
                dropDownData={sessionData?.data || []}
                handleDropDownExpand={handleSessionClick}
                handleDropDownSelect={handleSessionSelect}
                sessions={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content - 3 columns */}
      <div className="flex justify-between">
        {/* Left column */}
        <div className="w-2/12 flex flex-col items-center">
          <RadialProgressUserReport totalScore={reportData.totalScore} />
        </div>

        {/* Middle column (widest) */}
        <div className="w-6/12">
        <ScrollableTabs reportData={reportData} />

          {/* Add your graph or chart component here */}
          <div className="bg-base-200 h-64 mb-8">
            {/* Placeholder for graph/chart */}
            <p className="text-center py-24">Graph/Chart Placeholder</p>
          </div>

          {/* Parameters section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-200 p-4 rounded">
              <h3 className="font-semibold mb-2">Words per minute</h3>
              {/* Add progress bar or other visualization */}
            </div>
            <div className="bg-base-200 p-4 rounded">
              <h3 className="font-semibold mb-2">Filler sounds</h3>
              {/* Add progress bar or other visualization */}
            </div>
            <div className="bg-base-200 p-4 rounded">
              <h3 className="font-semibold mb-2">Pauses</h3>
              {/* Add progress bar or other visualization */}
            </div>
            <div className="bg-base-200 p-4 rounded">
              <h3 className="font-semibold mb-2">Repetitive words</h3>
              {/* Add progress bar or other visualization */}
            </div>
            <div className="bg-base-200 p-4 rounded">
              <h3 className="font-semibold mb-2">Speech rate</h3>
              {/* Add progress bar or other visualization */}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-3/12 text-start">
          <div className="mb-8">
            <h2 className="text-brand font-semibold text-2xl mb-2">
              Quiz Performance
            </h2>
            <p className="text-utility text-sm">
              You scored {reportData.quiz.score}% on the quiz.
            </p>
            <a className="link link-hover text-xs text-utility flex items-center mt-1">
              View Details
              <IoIosArrowForward className="ml-1" />
            </a>
          </div>

          <div className="mb-8">
            <h2 className="text-brand font-semibold text-2xl mb-2">
              Audio Preview
            </h2>
            <div className="bg-base-200 p-4 rounded-lg mb-2">
              {/* Replace this with your actual audio player component */}
              <div className="text-center">Audio Play Coming Soon!</div>
            </div>
            <TranscriptionCollapsable
              transcription={reportData.transcription}
            />
          </div>

          <div>
            <h2 className="text-brand font-semibold text-2xl mb-2">
              Useful Tips
            </h2>
            <div className="card bg-[#C6CFEE] shadow-xl border-r-2 border-b-2">
              <div className="card-body">
                <h3 className="card-title">Insight No. 1</h3>
                <p>If a dog chews shoes whose shoes does he choose?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
