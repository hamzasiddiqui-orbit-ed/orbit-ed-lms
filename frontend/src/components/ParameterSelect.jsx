import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import DerivedParameterDetails from "./DerivedParameterDetails";
import BaseParameterDetails from "./BaseParameterDetails";

const ParameterSelect = () => {
  const { reportId, derivedParameter, baseParameter } =
    useContext(SessionReportContext);

  if (derivedParameter && baseParameter == null) {
    return <DerivedParameterDetails />;
  } else if (baseParameter != null) {
    return <BaseParameterDetails />;
  } else {
    return (
      <div className="text-center py-24">
        Error! Do not having any data to display!
      </div>
    );
  }
};

export default ParameterSelect;
