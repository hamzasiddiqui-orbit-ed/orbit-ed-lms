import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user.context";
import { UserReportContext } from "../contexts/userReport.context";
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
import BaseParametersList from "./BaseParametersList";
import { IoIosArrowForward } from "react-icons/io";

export default function UserReport() {
  const { state: userState } = useContext(UserContext);
  const { state: userReportState, dispatch: userReportDispatch } =
    useContext(UserReportContext);

  const userId = userState.user._id;

  const {
    reportData,
    isLoading,
    isError,
    error,
    refetch: refetchReport,
  } = useFormatReport(
    userId,
    userReportState.moduleName,
    userReportState.sessionCount
  );

  useEffect(() => {
    if (userReportState.moduleName || userReportState.sessionCount) {
      refetchReport();
    }
  }, [userReportState.moduleName, userReportState.sessionCount, refetchReport]);

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
    error: sessionError,
  } = useModuleSessionsFromReports(userId, userReportState.moduleName);

  const handleModuleClick = async () => {
    await refetchModules();
    console.log(`MODULES: ${moduleData}`);
  };

  const handleModuleSelect = (moduleName) => {
    userReportDispatch({ type: "SET_MODULE_NAME", payload: moduleName });
  };

  const handleSessionClick = async () => {
    await refetchSessions();
    console.log(`SESSION COUNTS: ${sessionData}`);
  };

  const handleSessionSelect = (sessionCount) => {
    userReportDispatch({ type: "SET_SESSION_COUNT", payload: sessionCount });
  };

  if (isLoading) return <SkeletonUserReport />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!reportData) return <div>No report data available</div>;

  return (
    <div className="w-full h-full pe-5 mt-28">
      {/* ------------------------------------
      TOP SECTION - MODULE NAME, DATE, SESSION
      -------------------------------------*/}

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
            <div className="btn btn-sm bg-core border-0 shadow-core text-utility text-base font-normal hover:bg-[#D2D2D2]">
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

      {/* ---------------------------------------------------
      MAIN SECTION - LEFT COLUMN, MIDDLE COLUMN, RIGHT COLUMN
      ----------------------------------------------------*/}

      <div className="flex justify-between">
        {/* ------------------------------------------------
        LEFT COLUMN - RADIAL PROGRESS SCORE, BASE PARAMETERS
        -------------------------------------------------*/}

        <div className="w-2/12 flex flex-col items-center">
          <RadialProgressUserReport totalScore={reportData.totalScore} />

          {/* Parameters section */}

          <BaseParametersList reportData={reportData} />
        </div>

        {/* --------------------------------------------
        MIDDLE COLUMN - DERIVED PARAMETERS TAB & DETAILS
        ---------------------------------------------*/}

        <div className="w-6/12">
          <ScrollableTabs reportData={reportData} />

          {/* Add your graph or chart component here */}
          <div className="bg-core h-64 mb-8">
            {/* Placeholder for graph/chart */}
            <p className="text-center py-24">Graph/Chart Placeholder</p>
          </div>
        </div>

        {/* ----------------------------------------
        RIGHT COLUMN - MISC & BASE PARAMETERS GRAPHS
        -----------------------------------------*/}

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
            <div className="bg-[#D2D2D2] p-4 rounded-lg mb-2">
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
