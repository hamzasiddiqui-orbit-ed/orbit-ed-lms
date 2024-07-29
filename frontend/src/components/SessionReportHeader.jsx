import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/user.context";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useFormatReportGeneral } from "../hooks/useFormatReportGeneral";
import {
  useModuleFromReports,
  useModuleSessionsFromReports,
} from "../hooks/useReports";
import DropdownUserReport from "./SessionReportDropdown";

const SessionReportHeader = () => {
  const { state: userState } = useContext(UserContext);
  const userId = userState.user._id;

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSessionCount, setSelectedSessionCount] = useState(null);

  const { setReportId, setModuleName, setTotalScore } = useContext(SessionReportContext);

  const {
    reportData,
    isPending,
    isError,
    refetch: refetchReport,
  } = useFormatReportGeneral(userId, selectedModule, selectedSessionCount);

  const {
    data: moduleData,
    refetch: refetchModules,
    isLoading: isModuleLoading,
    isError: isModuleError,
  } = useModuleFromReports(userId);

  const {
    data: sessionData,
    refetch: refetchSessions,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useModuleSessionsFromReports(userId, selectedModule);

  useEffect(() => {
    if (reportData) {
      if (!selectedModule) {
        setSelectedModule(reportData.moduleName);
      }
      if (!selectedSessionCount) {
        setSelectedSessionCount(reportData.sessionCount);
      }
      setReportId(reportData.reportId);
      setTotalScore(reportData.totalScore);
      setModuleName(reportData.moduleName);
    }
  }, [
    reportData,
    selectedModule,
    selectedSessionCount,
    setReportId,
    setTotalScore,
  ]);

  useEffect(() => {
    if (selectedModule && selectedSessionCount) {
      refetchReport();
    }
  }, [selectedModule, selectedSessionCount, refetchReport]);

  const handleModuleSelect = (moduleName) => {
    setSelectedModule(moduleName);
    setSelectedSessionCount(null); // Reset session count when module changes
  };

  const handleSessionSelect = (sessionCount) => {
    setSelectedSessionCount(sessionCount);
  };

  if (isPending || isModuleLoading || isSessionLoading) {
    return (
      <div className="flex flex-col gap-4 ps-5 mb-12">
        <div className="skeleton h-10 w-44"></div>
        <div className="skeleton h-8"></div>
        <div className="skeleton h-8"></div>
      </div>
    );
  }

  if (isError || isModuleError || isSessionError) {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <div className="flex items-start mb-12 ps-5">
      <div className="w-full">
        <h1 className="text-3xl font-medium text-headingDark mb-4 ps-2 text-start">
          Module Performance
        </h1>
        
        <div className="mb-4 text-start">
          <DropdownUserReport
            title={selectedModule || "Select Module"}
            dropDownData={moduleData?.data || []}
            handleDropDownExpand={refetchModules}
            handleDropDownSelect={handleModuleSelect}
            sessions={false}
          />
        </div>
        <div className="flex items-center">
          <div className="btn btn-sm bg-core border-0 shadow-core text-textLight text-base font-normal hover:bg-sideNavHighlight">
            {reportData?.createdAt || "N/A"}
          </div>
          <div className="ml-8">
            <DropdownUserReport
              title={`Session count: ${selectedSessionCount || "N/A"}`}
              dropDownData={sessionData?.data || []}
              handleDropDownExpand={refetchSessions}
              handleDropDownSelect={handleSessionSelect}
              sessions={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionReportHeader;
