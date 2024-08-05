import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user.context";
import DropdownUserReport from "./UserReportsDropdown";
import {
  useAssignedModules,
  useModuleGeneralDetails,
} from "../hooks/useModules";

const UserReportsHeader = ({ sendModuleNameToParent }) => {
  const { state: userState } = useContext(UserContext);
  const userId = userState.user._id;

  const [selectedModule, setSelectedModule] = useState(null);

  const {
    data: assignedModules,
    isPending,
    isError,
    refetch: refetchAssignedModules,
  } = useAssignedModules(userId);

  const {
    data: moduleGeneralDetails,
    isPending: pendingModuleGeneralDetails,
    isError: errorModuleGeneralDetails,
  } = useModuleGeneralDetails(userId, selectedModule);

  const handleModuleSelect = (moduleName) => {
    setSelectedModule(moduleName === "All Modules" ? null : moduleName);
    sendModuleNameToParent(moduleName);
  };

  const dropdownData = assignedModules?.data
    ? ["All Modules", ...assignedModules.data]
    : ["All Modules"];

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 ps-5 mb-12">
        <div className="skeleton bg-slate-200 h-10 w-44"></div>
        <div className="skeleton bg-slate-200 h-8 w-9/12"></div>
        <div className="skeleton bg-slate-200 h-8 w-9/12"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading data. Please try again.</div>;
  }

  const getScoreColorClass = () => {
    if (moduleGeneralDetails.data.averageScore < 40) {
      return "text-progressBad ms-1";
    } else if (moduleGeneralDetails.data.averageScore < 70) {
      return "text-progressAverage ms-1";
    } else {
      return "text-progressGood ms-1";
    }
  };

  return (
    <div className="flex items-start ps-5">
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
            sessions={false}
          />
        </div>
        {moduleGeneralDetails?.data && (
          <>
            <div className="flex items-center mt-3">
              <div className="text-textLight text-base font-normal ps-3">
                Assigned Date: {moduleGeneralDetails.data.assignedDate}
              </div>

              <div className="text-textLight text-base font-normal ps-16">
                Due Date: {moduleGeneralDetails.data.dueDate}
              </div>

              {moduleGeneralDetails.data.completedDate ? (
                <div className="text-textLight text-base font-normal ps-16">
                  Completed Date: {moduleGeneralDetails.data.completedDate}
                </div>
              ) : (
                <div className="text-textLight text-base font-normal ps-16">
                  Completed Date: --
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="text-textLight text-base font-normal ps-3">
                Assigned By: {moduleGeneralDetails.data.assignedBy}
              </div>

              <div className="text-textLight text-base font-normal ps-3 pe-8 flex">
                {moduleGeneralDetails.data.averageScore ? (
                  <>
                    <p>Average Module Score:</p>
                    <p className={getScoreColorClass()}>
                      {moduleGeneralDetails.data.averageScore.toFixed(2)}%
                    </p>
                  </>
                ) : (
                  <>
                    <p>Average Module Score: --</p>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserReportsHeader;
