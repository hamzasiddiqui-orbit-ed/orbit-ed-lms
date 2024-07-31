import React, { useState } from "react";
import UserAvatar from "./UserAvatar";
import UserReportsHeader from "./UserReportsHeader";
import UserReportsBody from "./UserReportsBody";

const ReportList = () => {
  const [moduleName, setModuleName] = useState("");

  function handleModuleNameFromBody(name) {
    if (name == "All Modules") {
      setModuleName("");
    } else {
      setModuleName(name);
    }
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
