import React from "react";

const RadialProgressSessionScore = (score) => {
  return (
    <div className="relative w-48 h-48">
      {/* Outer background circle */}
      <div className="absolute inset-5 rounded-full bg-highlight"></div>

      {/* Inner background circle */}
      <div className="absolute inset-8 rounded-full bg-brand"></div>

      {/* Radial progress */}
      <div
        className="radial-progress text-blue-500 absolute inset-0"
        style={{
          "--value": score,
          "--size": "12rem",
          "--thickness": "8px",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-core">{score}%</span>
          <span className="text-sm text-core">Session Score</span>
        </div>
      </div>
    </div>
  );
};

export default RadialProgressSessionScore;