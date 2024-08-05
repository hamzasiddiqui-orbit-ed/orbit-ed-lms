import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterDetails } from "../hooks/useReports";
import { pauses } from "../utils/baseParametersInfo";
import { RiMapPin2Fill } from "react-icons/ri";
import TooltipPopOver from "./TooltipPopOver";
import ProgressBarLinear from "./ProgressBarLinear";

const PausesDetail = () => {
  const { reportId, baseParameter } = useContext(SessionReportContext);

  const { data, isPending, isError } = useBaseParameterDetails(
    reportId,
    baseParameter
  );

  if (data) {
    var baseParameterDetails = data.data["pauses"];
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

  const maxPauses = 6;
  const minPauses = 0;

  const getCursorPosition = (mean) => {
    if (mean > maxPauses) return "100%";
    if (mean < minPauses) return "0%";
    const position = ((mean - minPauses) / (maxPauses - minPauses)) * 100;
    return `${position}%`;
  };

  const getStatsBarClass = (count) => {
    if (count <= 3) {
      return "h-3 rounded-full bg-[#8BCB7B]"
    } else if (count > 3 && count <= 4) {
      return "h-3 rounded-full bg-[#93A4E0]"
    } else if (count > 4 && count <= 5) {
      return "h-3 rounded-full bg-[#F6B757]"
    } else {
      return "h-3 rounded-full bg-[#F4470E]"
    }
    
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between font-medium">
        <p className="text-2xl text-headingDark font-semibold">Pauses</p>

        <div className="flex flex-row justify-start gap-3 pt-1">
          <ProgressBarLinear score={baseParameterDetails.score} />
          <p className="text-textDark me-3">{baseParameterDetails.score} %</p>
        </div>
      </div>
      <p className="pt-5 text-start text-textLight">{pauses.description}</p>

      {/* Benchmark Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Benchmarks</span>
        <TooltipPopOver text="Sample text for Pauses benchmarks." align="middle" />
      </p>
      <div className="flex justify-center w-full">
        <div className="w-7/12 mt-6">
          <div
            className="relative h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #8BCB7B 50%, #93A4E0 67%, #F6B757 83%, #F4470E 100%)",
            }}
          >
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "50%" }}
            ></div>
            <div className="absolute -top-6" style={{ left: "45%" }}>
              <span className="text-xs">3 Pauses</span>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-textLight">
            <span className="ms-[0%]">Excellent</span>
            <span className="me-[0%]">Poor</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Stats</span>
        <TooltipPopOver text="Sample text for Pauses Stats." align="middle" />
      </p>
      <div className="flex justify-center w-full mt-4">
        <div className="w-7/12 relative">
          <div
            className={getStatsBarClass(baseParameterDetails.bad_count)}
          ></div>
          <div
            className="absolute top-[-20px] transform -translate-x-1/2"
            style={{ left: getCursorPosition(baseParameterDetails.bad_count) }}
          >
            <RiMapPin2Fill className="text-[#F4470E] text-xl" />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap mt-3">
              {baseParameterDetails.bad_count > maxPauses
                ? ">5 Pauses"
                : baseParameterDetails.bad_count < minPauses
                ? "undefined"
                : `${baseParameterDetails.bad_count} Pauses`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PausesDetail;
