import React, { useContext } from "react";
import DerivedParameterChart from "./DerivedParameterChart";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useDerivedParameterDetail } from "../hooks/useReports";

const DerivedParameterDetails = () => {
  const { reportId, derivedParameter } = useContext(SessionReportContext);

  const { data, isPending, isError } = useDerivedParameterDetail(
    reportId,
    derivedParameter
  );

  if (data) {
    var derivedParameterHeading =
      data.data.derived_parameter.charAt(0).toUpperCase() +
      data.data.derived_parameter.slice(1);
    var derivedParameterScore = data.data.score;
    var derivedParameterDescription = data.data.description;
  }

  if (isPending) {
    return (
      <div className="text-center py-24">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading Parameter Details.</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between font-medium">
        <p className="text-2xl text-headingDark font-semibold">{derivedParameterHeading}</p>

        <div className="flex flex-row justify-start gap-3 pt-1">
          <progress
            className="progress w-56 mt-2"
            value={derivedParameterScore}
            max="100"
          />
          <p className="text-textDark me-3">{derivedParameterScore} %</p>
        </div>
      </div>
      <p className="pt-5 text-start text-textLight">{derivedParameterDescription}</p>
      <DerivedParameterChart />
    </div>
  );
};

export default DerivedParameterDetails;
