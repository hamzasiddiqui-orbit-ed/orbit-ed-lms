import React, { useContext, useEffect } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useSessionReportDerivedParameters } from "../hooks/useReports";
import ScrollableTabs from "./ScrollableTabs";
import ParameterSelect from "./ParameterSelect";

const SessionReportMiddleCol = () => {
  const { reportId, setDerivedParameter } = useContext(SessionReportContext);

  const {
    data: derivedParameters,
    isPending,
    isError,
  } = useSessionReportDerivedParameters(reportId);

  useEffect(() => {
    if (derivedParameters && derivedParameters.data.parameters.derived) {
      const derivedKeys = Object.keys(derivedParameters.data.parameters.derived);
      if (derivedKeys.length > 0) {
        setDerivedParameter(derivedKeys[0]);
      }
    }
  }, [derivedParameters, setDerivedParameter]);

  if (isPending ) {
    return (
      <div className="flex w-6/12 flex-col gap-4 me-5">
        <div className="skeleton bg-slate-200 h-10 w-full"></div>
        <div className="skeleton bg-slate-200 h-80 w-full"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading report data</div>;
  }

  if (!derivedParameters) {
    return <div>No report data available</div>;
  }

  return (
    <div className="w-6/12">
      {derivedParameters && (
        <>
          <ScrollableTabs reportData={derivedParameters.data} />

          {/* Add your graph or chart component here */}
          <div className="bg-core h-64 mb-8">
            {/* Placeholder for graph/chart */}
            <ParameterSelect />
          </div>
        </>
      )}
    </div>
  );
};

export default SessionReportMiddleCol;
