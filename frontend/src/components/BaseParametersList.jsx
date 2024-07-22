import React from "react";
import FeedbackText from "./FeedbackText";

const BaseParametersList = ({ baseParameters }) => {
  const handleParameterClick = (parameterName) => {
    // You can add functionality here when a parameter is clicked
    console.log(`Clicked on parameter: ${parameterName}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full mt-6">
      {Object.entries(baseParameters).map(([key, value]) => (
        <div key={key} className="flex justify-start items-center">
          <div className="flex flex-col w-32">
            <button
              onClick={() => handleParameterClick(key)}
              className="text-left hover:underline focus:outline-none font-semibold text-sm"
            >
              {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
            </button>

            {/* <span className="font-semibold">{value.toFixed(2)}</span> */}
            <progress className="progress progress-primary w-16 h-2" value={value.toFixed(2)} max="100"></progress>
          </div>
          <FeedbackText score={value.toFixed(2)} />
        </div>
      ))}
    </div>
  );
};

export default BaseParametersList;
