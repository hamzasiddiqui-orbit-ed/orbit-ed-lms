import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterDetails } from "../hooks/useReports";
import { clarity } from "../utils/baseParametersInfo";
import { RiMapPin2Fill } from "react-icons/ri";
import TooltipPopOver from "./TooltipPopOver";
import ProgressBarLinear from "./ProgressBarLinear";

const ClarityDetails = () => {
  const { reportId, baseParameter } = useContext(SessionReportContext);

  const { data, isPending, isError } = useBaseParameterDetails(
    reportId,
    baseParameter
  );

  if (data) {
    var baseParameterDetails = data.data["clarity"];
    console.log(baseParameterDetails);
  }

  if (isPending) {
    return (
      <div className="text-center py-24">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading Parameter Details.</div>;
  }

  const maxClarity = 100;
  const minClarity = 0;

  const getCursorPosition = (mean) => {
    if (mean > maxClarity) return "100%";
    if (mean < minClarity) return "0%";
    const position = ((mean - minClarity) / (maxClarity - minClarity)) * 100;
    return `${position}%`;
  };

  const getStatsBarClass = (percent) => {
    if (percent >= 75) {
      return "h-3 rounded-full bg-[#8BCB7B]"
    } else if (percent >= 50 && percent < 75) {
      return "h-3 rounded-full bg-[#93A4E0]"
    } else if (percent >= 25 && percent < 50) {
      return "h-3 rounded-full bg-[#F6B757]"
    } else {
      return "h-3 rounded-full bg-[#F4470E]"
    }
    
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between font-medium">
        <p className="text-2xl text-headingDark font-semibold">Clarity</p>

        <div className="flex flex-row justify-start gap-3 pt-1">
          <ProgressBarLinear score={baseParameterDetails.score} />
          <p className="text-textDark me-3">{baseParameterDetails.score} %</p>
        </div>
      </div>
      <p className="pt-5 text-start text-textLight">{clarity.description}</p>

      {/* Benchmark Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Benchmarks</span>
        <TooltipPopOver text="Sample text for Clarity benchmarks." align="middle" />
      </p>
      <div className="flex justify-center w-full">
        <div className="w-7/12 mt-6">
          <div
            className="relative h-3 rounded-full"
            style={{
              background: "linear-gradient(90deg, #F4470E 12%, #F6B757 37%, #93A4E0 62%, #8BCB7B 87%)",
            }}
          >
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "50%" }}
            ></div>

            <div className="absolute -top-6" style={{ left: "47%" }}>
              <span className="text-xs">50 %</span>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-textLight">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Stats</span>
        <TooltipPopOver text="Sample text for Clarity benchmarks." align="middle" />
      </p>
      <div className="flex justify-center w-full mt-4">
        <div className="w-7/12 relative">
          <div
            className={getStatsBarClass(baseParameterDetails.score)}
          ></div>
          <div
            className="absolute top-[-20px] transform -translate-x-1/2"
            style={{ left: getCursorPosition(baseParameterDetails.mean) }}
          >
            <RiMapPin2Fill className="text-[#F4470E] text-xl" />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap mt-3">
              {baseParameterDetails.mean > maxClarity
                ? "undefined"
                : baseParameterDetails.mean < minClarity
                ? "undefined"
                : `${baseParameterDetails.mean} %`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClarityDetails;
