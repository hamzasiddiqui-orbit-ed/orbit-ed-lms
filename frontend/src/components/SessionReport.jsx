import React from "react";

import SessionReportHeader from "./SessionReportHeader";
import SessionReportMiddleCol from "./SessionReportMiddleCol";
import SessionReportRightCol from "./SessionReportRightCol";
import SessionReportLeftCol from "./SessionReportLeftCol";

function SessionReport() {
  return (
    <div className="w-full h-full pe-5 mt-28">
      {/* ------------------------------------
      TOP SECTION - MODULE NAME, DATE, SESSION
      -------------------------------------*/}
      <SessionReportHeader />

      {/* ---------------------------------------------------
      MAIN SECTION - LEFT COLUMN, MIDDLE COLUMN, RIGHT COLUMN
      ----------------------------------------------------*/}
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
    </div>
  );
}

export default SessionReport;
