import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParametersFromDerived } from "../hooks/useReports";
import RadialProgressUserReport from "./RadialProgressUserReport";
import BaseParametersList from "./BaseParametersList";

const SessionReportLeftCol = () => {
  const { reportId, totalScore, derivedParameter } =
    useContext(SessionReportContext);

  const {
    data: baseParameters,
    isPending,
    isError,
  } = useBaseParametersFromDerived(reportId, derivedParameter);

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 ms-10 items-center">
        <div className="skeleton bg-slate-200 h-44 w-44 shrink-0 rounded-full"></div>
        <div className="skeleton bg-slate-200 h-10 w-full"></div>
        <div className="skeleton bg-slate-200 h-10 w-full"></div>
        <div className="skeleton bg-slate-200 h-10 w-full"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading base parameters</div>;
  }

  if (baseParameters.data) {
    console.log(`Base Parameters Data: ${JSON.stringify(baseParameters.data)}`)
  }

  return (
    <div className="flex flex-col items-center ms-10">
      <RadialProgressUserReport totalScore={totalScore} />

      {/* Parameters section */}
      {baseParameters.data && Object.keys(baseParameters.data).length > 0 ? (
        <BaseParametersList baseParameters={baseParameters.data} />
      ) : (
        <div>No base parameters available</div>
      )}
    </div>
  );
};

export default SessionReportLeftCol;
