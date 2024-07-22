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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading base parameters</div>;
  }

  return (
    <div className="w-2/12 flex flex-col items-center ms-10">
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
