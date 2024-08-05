import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterDetails } from "../hooks/useReports";
import { repetitiveWords } from "../utils/baseParametersInfo";
import { RiMapPin2Fill } from "react-icons/ri";
import TooltipPopOver from "./TooltipPopOver";
import ProgressBarLinear from "./ProgressBarLinear";

const RepetitiveWordsDetails = () => {
  const { reportId, baseParameter } = useContext(SessionReportContext);

  const { data, isPending, isError } = useBaseParameterDetails(
    reportId,
    baseParameter
  );

  if (data) {
    var baseParameterDetails = data.data["repetitive_words"];
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

  const maxRepetitiveWords = 4.5;
  const minRepetitiveWords = 2;

  const getCursorPosition = (mean) => {
    if (mean > maxRepetitiveWords) return "100%";
    if (mean < minRepetitiveWords) return "0%";
    const position =
      ((mean - minRepetitiveWords) / (maxRepetitiveWords - minRepetitiveWords)) * 100;
    return `${position}%`;
  };

  const maxCount = Math.max(
    ...baseParameterDetails.list.map((item) => Object.values(item)[0])
  );

  const getStatsBarClass = (countPercentage) => {
    if (countPercentage <= 2.8) {
      return "h-3 rounded-full bg-[#8BCB7B]"
    } else if (countPercentage > 2.8 && countPercentage <= 3.4) {
      return "h-3 rounded-full bg-[#93A4E0]"
    } else if (countPercentage > 3.4 && countPercentage <= 4.0) {
      return "h-3 rounded-full bg-[#F6B757]"
    } else {
      return "h-3 rounded-full bg-[#F4470E]"
    }
    
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between font-medium">
        <p className="text-2xl text-headingDark font-semibold">Repetitive Words</p>

        <div className="flex flex-row justify-start gap-3 pt-1">
          <ProgressBarLinear score={baseParameterDetails.score} />
          <p className="text-textDark me-3">{baseParameterDetails.score} %</p>
        </div>
      </div>
      <p className="pt-5 text-start text-textLight">
        {repetitiveWords.description}
      </p>

      {/* Benchmark Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Benchmarks</span>
        <TooltipPopOver text="Sample text for Repetitive Words benchmarks." align="middle" />
      </p>
      <div className="flex justify-center w-full">
        <div className="w-7/12 mt-6">
          <div
            className="relative h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #8BCB7B 32%, #93A4E0 56%, #F6B757 80%, #F4470E 100%)",
            }}
          >
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "32%" }}
            ></div>
            <div className="absolute -top-6" style={{ left: "27%" }}>
              <span className="text-xs">3 Words</span>
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
        <TooltipPopOver text="Sample text for Repetitive Words benchmarks." align="middle" />
      </p>
      <div className="flex justify-center w-full mt-4">
        <div className="w-7/12 relative">
          <div
            className={getStatsBarClass(baseParameterDetails.count_percentage)}
          ></div>
          <div
            className="absolute top-[-20px] transform -translate-x-1/2"
            style={{ left: getCursorPosition(baseParameterDetails.count_percentage) }}
          >
            <RiMapPin2Fill className="text-[#F4470E] text-xl" />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap mt-3">
              {baseParameterDetails.count_percentage > maxRepetitiveWords
                ? ">4.5 %"
                : baseParameterDetails.count_percentage < minRepetitiveWords
                ? "<2 %"
                : `${baseParameterDetails.count_percentage} %`}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bars for Sounds */}
      <div className="mt-8 flex flex-wrap justify-between me-5">
        {baseParameterDetails.list.map((item) => {
          const [sound, count] = Object.entries(item)[0];
          const progressValue = (count / maxCount) * 100;
          const progressColorClass =
            count === maxCount ? "progress-bad" : "progress-basic";

          return (
            <div key={sound} className="flex items-center mt-4">
              <span className="text-textDark text-start font-medium w-12">
                {sound}
              </span>
              <progress
                className={`progress ms-0 w-36 bg-[#D9D9D9] ${progressColorClass}`}
                value={progressValue}
                max="100"
              ></progress>
              <span className="text-textDark ms-2">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RepetitiveWordsDetails;
