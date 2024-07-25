import React, { createContext, useState } from "react";

export const SessionReportContext = createContext();

export const SessionReportProvider = ({ children }) => {
  const [reportId, setReportId] = useState(null);
  const [moduleName, setModuleName] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const [derivedParameter, setDerivedParameter] = useState(null);
  const [baseParameter, setBaseParameter] = useState(null);

  return (
    <SessionReportContext.Provider
      value={{
        reportId,
        setReportId,
        moduleName,
        setModuleName,
        totalScore,
        setTotalScore,
        derivedParameter,
        setDerivedParameter,
        baseParameter,
        setBaseParameter,
      }}
    >
      {children}
    </SessionReportContext.Provider>
  );
};
