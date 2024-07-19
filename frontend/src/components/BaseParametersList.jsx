import React, { useContext } from "react";
import { UserReportContext } from "../contexts/userReport.context";

const BaseParametersList = ({ reportData }) => {
  const { state: userReportState, dispatch: userReportDispatch } =
    useContext(UserReportContext);

  const baseParameters = Object.keys(reportData.parameters.base);

  return (
    <div className="flex flex-col gap-4">
      {baseParameters.map((key) => (
        <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
      ))}
    </div>
  );
};

export default BaseParametersList;
