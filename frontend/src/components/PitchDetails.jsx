import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterDetails } from "../hooks/useReports";
import { pitch } from "../utils/baseParametersInfo";
import { RiMapPin2Fill } from "react-icons/ri";
import ProgressBarLinear from "./ProgressBarLinear";
import TooltipPopOver from "./TooltipPopOver";

const PitchDetails = () => {
  const { reportId, baseParameter } = useContext(SessionReportContext);

  const { data, isPending, isError } = useBaseParameterDetails(
    reportId,
    baseParameter
  );

  if (data) {
    var baseParameterDetails = data.data["pitch"];
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

  const maxPitch = 0.35;
  const minPitch = 0;

  const getCursorPosition = (mean) => {
    if (mean > maxPitch) return "100%";
    if (mean < minPitch) return "0%";
    const position = ((mean - minPitch) / (maxPitch - minPitch)) * 100;
    return `${position}%`;
  };

  const getStatsBarClass = (pvq) => {
    // Excellent
    if (pvq <= 0.25 && pvq >= 0.20) {
      return "h-3 rounded-full bg-[#8BCB7B]"
    }
    // Good
    else if ((pvq < 0.20 && pvq >= 0.16) || (pvq > 0.25 && pvq <= 0.27)) {
      return "h-3 rounded-full bg-[#93A4E0]"
    }
    // Average
    else if ((pvq < 0.16 && pvq >= 0.14) || (pvq > 0.27 && pvq <= 0.28)) {
      return "h-3 rounded-full bg-[#F6B757]"
    }
    // Poor
    else {
      return "h-3 rounded-full bg-[#F4470E]"
    }
    
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between font-medium">
        <p className="text-2xl text-headingDark font-semibold">Pitch</p>

        <div className="flex flex-row justify-start gap-3 pt-1">
          <ProgressBarLinear score={baseParameterDetails.score} />
          <p className="text-textDark me-3">{baseParameterDetails.score} %</p>
        </div>
      </div>
      <p className="pt-5 text-start text-textLight">{pitch.description}</p>

      {/* Benchmark Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Benchmarks</span>
        <TooltipPopOver text="Sample text for Pitch benchmarks." align="middle" />
      </p>
      <div className="flex justify-center w-full">
        <div className="w-7/12 mt-6">
          <div
            className="relative h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #F4470E 20%, #F6B757 43%, #93A4E0 52%, #8BCB7B 57%, #8BCB7B 71%, #93A4E0 74%, #F6B757 78%, #F4470E 90%)",
            }}
          >
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "57%" }}
            ></div>
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "71%" }}
            ></div>
            <div className="absolute -top-6" style={{ left: "52%" }}>
              <span className="text-xs">0.20 PVQ</span>
            </div>
            <div className="absolute -top-6" style={{ left: "66%" }}>
              <span className="text-xs">0.25 PVQ</span>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-textLight">
            <span>Poor</span>
            <span className="mr-[-40%]">Good</span>
            <span>Poor</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Stats</span>
        <TooltipPopOver text="Sample text for Pitch Stats." align="middle" />
      </p>
      <div className="flex justify-center w-full mt-4">
        <div className="w-7/12 relative">
          <div
            className={getStatsBarClass(baseParameterDetails.mean)}
          ></div>
          <div
            className="absolute top-[-20px] transform -translate-x-1/2"
            style={{ left: getCursorPosition(baseParameterDetails.mean) }}
          >
            <RiMapPin2Fill className="text-[#F4470E] text-xl" />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap mt-3">
              {baseParameterDetails.mean > maxPitch
                ? ">0.3 PVQ"
                : baseParameterDetails.mean < minPitch
                ? "undefined"
                : `${baseParameterDetails.mean} PVQ`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDetails;
