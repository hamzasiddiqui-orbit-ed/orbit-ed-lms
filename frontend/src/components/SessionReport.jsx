import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";

import SessionReportHeader from "./SessionReportHeader";
import SessionReportMiddleCol from "./SessionReportMiddleCol";
import SessionReportRightCol from "./SessionReportRightCol";
import SessionReportLeftCol from "./SessionReportLeftCol";
import UserAvatar from "./UserAvatar";
import QuizDetails from "./QuizDetails";

import NoSessionReport from "./NoSessionReport";

import { UserContext } from "../contexts/user.context";

function SessionReport() {
  const { showQuiz } = useContext(SessionReportContext);

  const { state: userState } = useContext(UserContext);

  if (!userState.user.total_sessions_taken) {
    console.log("session report is greater than 1");
    return <NoSessionReport />
  }

  return (
    <div className="w-100 h-full pe-5 relative pt-10">
      {/* ------------------------------------
      TOP SECTION - MODULE NAME, DATE, SESSION
      -------------------------------------*/}
      <UserAvatar />

      <SessionReportHeader />

      {/* ---------------------------------------------------
      MAIN SECTION - LEFT COLUMN, MIDDLE COLUMN, RIGHT COLUMN
      ----------------------------------------------------*/}
      
        {!showQuiz ? (
          <div className="flex justify-between">
            {/* ------------------------------------------------
            LEFT COLUMN - RADIAL PROGRESS SCORE, BASE PARAMETERS
            -------------------------------------------------*/}
            <SessionReportLeftCol />

            {/* --------------------------------------------
            MIDDLE COLUMN - DERIVED PARAMETERS TAB & DETAILS
            ---------------------------------------------*/}
            <SessionReportMiddleCol />

            {/* ----------------------------------------
            RIGHT COLUMN - MISC & BASE PARAMETERS GRAPHS
            -----------------------------------------*/}
            <SessionReportRightCol />
          </div>
        ) : (
          <div className="flex justify-start">
            {/* --------
            QUIZ DETAILS
            ---------*/}
            <QuizDetails />
          </div>
        )}
      </div>
  );
}

export default SessionReport;
