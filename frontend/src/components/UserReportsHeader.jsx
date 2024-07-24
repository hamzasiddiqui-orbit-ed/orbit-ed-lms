import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user.context";
import DropdownUserReport from "./SessionReportDropdown";
import { useAssignedModules } from "../hooks/useModules";

const UserReportsHeader = () => {
  const { state: userState } = useContext(UserContext);
  const userId = userState.user._id;

  const [selectedModule, setSelectedModule] = useState(null);

  const {
    data: assignedModules,
    isPending,
    isError,
    refetch: refetchAssignedModules,
  } = useAssignedModules(userId);

  const handleModuleSelect = (moduleName) => {
    setSelectedModule(moduleName === "All Modules" ? null : moduleName);
  };

  const dropdownData = assignedModules?.data
    ? ["All Modules", ...assignedModules.data]
    : ["All Modules"];

  return (
    <div className="flex items-start mb-12 ps-5">
      <div className="w-full">
        <h1 className="text-3xl font-medium text-headingDark mb-4 ps-2 text-start">
          Module Overview
        </h1>
        <div className="mb-4 text-start">
          <DropdownUserReport
            title={selectedModule || "All Modules"}
            dropDownData={dropdownData}
            handleDropDownExpand={refetchAssignedModules}
            handleDropDownSelect={handleModuleSelect}
          />
        </div>
        <div className="flex items-center">
          <div className="btn btn-sm bg-core border-0 shadow-core text-textLight text-base font-normal hover:bg-sideNavHighlight">
            Assigned Date:
          </div>
          <div className="btn btn-sm bg-core border-0 shadow-core text-textLight text-base font-normal hover:bg-sideNavHighlight ms-16">
            Completed Date:
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="btn btn-sm bg-core border-0 shadow-core text-textLight text-base font-normal hover:bg-sideNavHighlight">
            Assigned By:
          </div>
          <div className="btn btn-sm bg-core border-0 shadow-core text-textLight text-base font-normal hover:bg-sideNavHighlight ms-16">
            Module Average Score:
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReportsHeader;
