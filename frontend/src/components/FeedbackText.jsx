import React from "react";

const FeedbackText = ({ score }) => {
  return (
    <>
      {(() => {
        if (score >= 0 && score < 30) {
          return <p className="text-xs ps-2 text-[#F15A29]">Bad</p>;
        } else if (score >= 30 && score < 70) {
          return <p className="text-xs ps-2 text-[#F6B751]">Average</p>;
        } else {
          return <p className="text-xs ps-2 text-[#8BCB7B]">Good</p>;
        }
      })()}
    </>
  );
};

export default FeedbackText;
