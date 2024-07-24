import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";

const BaseParametersList = ({ baseParameters }) => {
  const { baseParameter, setBaseParameter } = useContext(SessionReportContext);

  const handleParameterClick = (baseParameterName) => {
    if (baseParameter === baseParameterName) {
      setBaseParameter(null);
    } else {
      setBaseParameter(baseParameterName);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full mt-6">
      {Object.entries(baseParameters).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleParameterClick(key)}
          className="text-left focus:outline-none font-semibold text-sm flex group"
        >
          <div
            className={`w-2 h-2 mt-3 me-4 rounded-full group-hover:bg-highlight ${
              baseParameter === key ? "bg-brand" : "bg-sideNavBG"
            }`}
          />

          <div className="flex flex-col">
            <p>
              {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
            </p>

            <progress
              className="progress progress-primary w-16 h-2"
              value={value.toFixed(2)}
              max="100"
            ></progress>
          </div>
        </button>
      ))}
    </div>
  );
};

export default BaseParametersList;
