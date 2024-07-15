import React from "react";

const RadialProgressUserReport = ({ totalScore }) => {
  return (
    <div className="relative w-48 h-48">
      {/* Outer background circle */}
      <div className="absolute inset-5 rounded-full bg-[#8497DB] opacity-30"></div>

      {/* Inner background circle */}
      <div
        className="absolute inset-8 rounded-full"
        style={{ background: "radial-gradient(#123DDA, #8497DB)" }}
      ></div>

      {/* Radial progress */}
      <div
        className="radial-progress absolute inset-0 bg-gradient-to-r text-[#3D60DD]"
        style={{
          "--value": totalScore,
          "--size": "12rem",
          "--thickness": "8px",
          // background: 'linear-gradient(to right, #123DDA , #8497DB)'s
          // color: "red"
        }}
      >
        <div className=" flex flex-col items-center justify-center">
          <span className="text-3xl font-base text-core">
            {totalScore}%
          </span>
          <span className="text-xs text-core">Session Score</span>
        </div>
      </div>
    </div>
  );
};

export default RadialProgressUserReport;
