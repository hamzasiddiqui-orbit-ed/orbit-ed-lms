import React, { useState, useContext } from "react";
import UserAvatar from "./UserAvatar";
import UserReportsHeader from "./UserReportsHeader";
import UserReportsBody from "./UserReportsBody";
import { UserContext } from "../contexts/user.context";
import NoSessionReport from "./NoSessionReport";

const ReportList = () => {
  const [moduleName, setModuleName] = useState("");

  const { state: userState } = useContext(UserContext);

  function handleModuleNameFromBody(name) {
    if (name == "All Modules") {
      setModuleName("");
    } else {
      setModuleName(name);
    }
  }

  if (!userState.user.total_sessions_taken) {
    console.log("session report is greater than 1");
    return <NoSessionReport />
  }

  return (
    <div className="w-100 h-full pe-5 relative pt-10">
      {/* -----------------------------------------------------------------------------------
      TOP SECTION - MODULE NAME, ASSIGNED DATE, COMPLETED DATE, ASSIGNED BY, MODULE AVG SCORE
      -------------------------------------*/}
      <UserAvatar />
      <UserReportsHeader sendModuleNameToParent={handleModuleNameFromBody} />

      {/* --------------------------------------
      TOP SECTION - List of USER SESSION REPORTS
      ---------------------------------------*/}
      <UserReportsBody moduleName={moduleName} />
    </div>
  );
};

export default ReportList;
