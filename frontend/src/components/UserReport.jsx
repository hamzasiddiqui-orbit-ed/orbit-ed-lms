import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user.context";
import { useFormatReport } from "../hooks/useFormatReport";
import {
  useModuleFromReports,
  useModuleSessionsFromReports,
} from "../hooks/useReports";
import SkeletonUserReport from "./SkeletonUserReport";
import DropdownUserReport from "../components/DropdownUserReport";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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
    <div className="w-full h-full">
      <div className="absolute top-0 pt-10 text-left sm:w-1/2">
        <p className="text-3xl font-medium text-brand ps-5">
          Module Performance
        </p>

        <div className="pt-4 ps-2">
          <DropdownUserReport
            title={reportData.moduleName}
            dropDownData={moduleData?.data || []}
            handleDropDownExpand={handleModuleClick}
            handleDropDownSelect={handleModuleSelect}
            sessions={false}
          />
        </div>

        <div className="flex flex-row ps-2">
          <summary className="btn btn-sm bg-core border-0 shadow-core text-utility text-base font-normal">
            {reportData.createdAt}
          </summary>
          <div className="ps-8">
            <DropdownUserReport
              title={`Session Count: ${reportData.sessionCount}`}
              dropDownData={sessionData?.data || []}
              handleDropDownExpand={handleSessionClick}
              handleDropDownSelect={handleSessionSelect}
              sessions={true}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-rows sm:grid-cols-4">
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            {/* Outer background circle */}
            <div className="absolute inset-5 rounded-full bg-[#8497DB] opacity-30"></div>

            {/* Inner background circle */}
            <div
              className="absolute inset-8 rounded-full"
              style={{ background: "radial-gradient(#123DDA, #8497DB)" }}
            ></div>

            {/* Radial progress */}
            <div
              className="radial-progress absolute inset-0 bg-gradient-to-r text-[#3D60DD]"
              style={{
                "--value": reportData.totalScore,
                "--size": "12rem",
                "--thickness": "8px",
                // background: 'linear-gradient(to right, #123DDA , #8497DB)'s
                // color: "red"
              }}
            >
              <div className=" flex flex-col items-center justify-center">
                <span className="text-3xl font-base text-core">
                  {reportData.totalScore}%
                </span>
                <span className="text-xs text-core">Session Score</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <div role="tablist" className="tabs tabs-boxed">
            <a role="tab" class="tab">
              Tab 1
            </a>
            <a role="tab" class="tab tab-active">
              Tab 2
            </a>
            <a role="tab" class="tab">
              Tab 3
            </a>
          </div>
        </div>

        <div className="bg-utility">hello</div>
      </div>
    </div>
  );
}
