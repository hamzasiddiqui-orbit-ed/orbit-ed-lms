import React from "react";

const ProgressBarLinear = ({ score }) => {
  let progressColorClass = "progress-good"; // Default to 'good'
  if (score < 40) {
    progressColorClass = "progress-bad";
  } else if (score < 70) {
    progressColorClass = "progress-average";
  }

  return (
    <progress
      className={`progress ${progressColorClass} bg-[#D9D9D9] w-56 mt-2`}
      value={score}
      max="100"
    />
  );
};

export default ProgressBarLinear;
