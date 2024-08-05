import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterDetails } from "../hooks/useReports";
import { speechRate } from "../utils/baseParametersInfo";
import { RiMapPin2Fill } from "react-icons/ri";
import TooltipPopOver from "./TooltipPopOver";
import ProgressBarLinear from "./ProgressBarLinear";

const SpeechRateDetails = () => {
  const { reportId, baseParameter } = useContext(SessionReportContext);

  const { data, isPending, isError } = useBaseParameterDetails(
    reportId,
    baseParameter
  );

  if (data) {
    var baseParameterDetails = data.data["speech_rate"];
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

  const maxWpm = 245;
  const minWpm = 55;

  const getCursorPosition = (mean) => {
    if (mean > maxWpm) return "100%";
    if (mean < minWpm) return "0%";
    const position = ((mean - minWpm) / (maxWpm - minWpm)) * 100;
    return `${position}%`;
  };

  const getStatsBarClass = (wpm) => {
    // Excellent
    if (wpm <= 190 && wpm >= 110) {
      return "h-3 rounded-full bg-[#8BCB7B]"
    }
    // Good
    else if ((wpm < 110 && wpm >= 100) || (wpm > 190 && wpm <= 200)) {
      return "h-3 rounded-full bg-[#93A4E0]"
    }
    // Average
    else if ((wpm < 100 && wpm >= 85) || (wpm > 200 && wpm <= 215)) {
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
        <p className="text-2xl text-headingDark font-semibold">
          Speech Rate
        </p>

        <div className="flex flex-row justify-start gap-3 pt-1">
          <ProgressBarLinear score={baseParameterDetails.score} />
          <p className="text-textDark me-3">{baseParameterDetails.score} %</p>
        </div>
      </div>
      <p className="pt-5 text-start text-textLight">{speechRate.description}</p>

      {/* Benchmark Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Benchmarks</span>
        <TooltipPopOver text="Sample text for WPM benchmarks." align="middle" />
      </p>
      <div className="flex justify-center w-full">
        <div className="w-7/12 mt-6">
          <div
            className="relative h-3 rounded-full"
            style={{
              background:
              // 90deg, #8BCB7B 32%, #93A4E0 56%, #F6B757 80%, #F4470E 100%
                "linear-gradient(90deg, #F4470E 6%, #F6B757 20%, #93A4E0 29%, #8BCB7B 32%, #8BCB7B 73%, #93A4E0 76%, #F6B757 83%, #F4470E 94%)",
            }}
          >
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "32%" }}
            ></div>
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "73%" }}
            ></div>
            <div className="absolute -top-6 text-textDark" style={{ left: "27%" }}>
              <span className="text-xs">110 WPM</span>
            </div>
            <div className="absolute -top-6 text-textDark" style={{ left: "68%" }}>
              <span className="text-xs">190 WPM</span>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-textLight">
            <span>Poor</span>
            <span className="ms-[5%]">Excellent</span>
            <span>Poor</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Stats</span>
        <TooltipPopOver text="Sample text for WPM benchmarks." align="middle" />
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
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap mt-3 text-textDark">
              {baseParameterDetails.mean > maxWpm
                ? "245 WPM"
                : baseParameterDetails.mean < minWpm
                ? "<55 WPM"
                : `${baseParameterDetails.mean} WPM`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechRateDetails;
