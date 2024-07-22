import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useSessionReportDerivedParameters } from "../hooks/useReports";
import ScrollableTabs from "./ScrollableTabs";

const SessionReportMiddleCol = () => {
  const { reportId } = useContext(SessionReportContext);

  const {
    data: derivedParmaters,
    isPending,
    isError,
  } = useSessionReportDerivedParameters(reportId);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading report data</div>;
  }

  if (!derivedParmaters) {
    return <div>No report data available</div>;
  }

  return (
    <div className="w-6/12">
      {derivedParmaters && (
        <>
          <ScrollableTabs reportData={derivedParmaters.data} />

          {/* Add your graph or chart component here */}
          <div className="bg-core h-64 mb-8">
            {/* Placeholder for graph/chart */}
            <p className="text-center py-24">Graph/Chart Placeholder</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SessionReportMiddleCol;
