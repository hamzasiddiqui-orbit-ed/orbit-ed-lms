import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterDetails } from "../hooks/useReports";
import { loudness } from "../utils/baseParametersInfo";
import { RiMapPin2Fill } from "react-icons/ri";
import TooltipPopOver from "./TooltipPopOver";
import ProgressBarLinear from "./ProgressBarLinear";

const LoudnessDetails = () => {
  const { reportId, baseParameter } = useContext(SessionReportContext);

  const { data, isPending, isError } = useBaseParameterDetails(
    reportId,
    baseParameter
  );

  if (data) {
    var baseParameterDetails = data.data["loudness"];
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

  const maxLoudness = 75;
  const minLoudness = 45;

  const getCursorPosition = (mean) => {
    if (mean > maxLoudness) return "100%";
    if (mean < minLoudness) return "0%";
    const position = ((mean - minLoudness) / (maxLoudness - minLoudness)) * 100;
    return `${position}%`;
  };

  const getStatsBarClass = (db) => {
    // Excellent
    if (db <= 66 && db >= 53) {
      return "h-3 rounded-full bg-[#8BCB7B]"
    }
    // Good
    else if ((db < 53 && db >= 51.5) || (db > 66 && db <= 68.2)) {
      return "h-3 rounded-full bg-[#93A4E0]"
    }
    // Average
    else if ((db < 51.5 && db >= 51) || (db > 68.2 && db <= 68.7)) {
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
        <p className="text-2xl text-headingDark font-semibold">Loudness</p>

        <div className="flex flex-row justify-start gap-3 pt-1">
          <ProgressBarLinear score={baseParameterDetails.score} />
          <p className="text-textDark me-3">{baseParameterDetails.score} %</p>
        </div>
      </div>
      <p className="pt-5 text-start text-textLight">{loudness.description}</p>

      {/* Benchmark Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Benchmarks</span>
        <TooltipPopOver text="Sample text for Loudness benchmarks." align="middle" />
      </p>
      <div className="flex justify-center w-full">
        <div className="w-7/12 mt-6">
          <div
            className="relative h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #F4470E 13%, #F6B757 21%, #93A4E0 24%, #8BCB7B 27%, #8BCB7B 71%, #93A4E0 74%, #F6B757 78%, #F4470E 90%)",
            }}
          >
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "27%" }}
            ></div>
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "71%" }}
            ></div>
            <div className="absolute -top-6" style={{ left: "22%" }}>
              <span className="text-xs">53 dB</span>
            </div>
            <div className="absolute -top-6" style={{ left: "66%" }}>
              <span className="text-xs">66 dB</span>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-textLight">
            <span className="ms-[0%]">Poor</span>
            <span className="me-[0%]">Excellent</span>
            <span className="me-[0%]">Poor</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Stats</span>
        <TooltipPopOver text="Sample text for Loudness stats." align="middle" />
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
              {baseParameterDetails.mean > maxLoudness
                ? ">75 dB"
                : baseParameterDetails.mean < minLoudness
                ? "<45 dB"
                : `${baseParameterDetails.mean} dB`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoudnessDetails;
