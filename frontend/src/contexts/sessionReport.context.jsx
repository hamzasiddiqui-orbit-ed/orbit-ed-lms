import React, { createContext, useState } from "react";

export const SessionReportContext = createContext();

export const SessionReportProvider = ({ children }) => {
  const [reportId, setReportId] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const [derivedParameter, setDerivedParameter] = useState(null);

  return (
    <SessionReportContext.Provider
      value={{
        reportId,
        setReportId,
        totalScore,
        setTotalScore,
        derivedParameter,
        setDerivedParameter,
      }}
    >
      {children}
    </SessionReportContext.Provider>
  );
};
