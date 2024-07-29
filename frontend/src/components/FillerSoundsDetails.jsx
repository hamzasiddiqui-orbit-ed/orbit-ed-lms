import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterDetails } from "../hooks/useReports";
import { fillerSounds } from "../utils/baseParametersInfo";
import { RiMapPin2Fill } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ProgressBarLinear from "./ProgressBarLinear";

const FillerSoundsDetails = () => {
  const { reportId, baseParameter } = useContext(SessionReportContext);

  const { data, isPending, isError } = useBaseParameterDetails(
    reportId,
    baseParameter
  );

  if (data) {
    var baseParameterDetails = data.data["filler_sounds"];
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

  const maxFillerSounds = 5;
  const minFillerSounds = 0;

  const getCursorPosition = (mean) => {
    if (mean > maxFillerSounds) return "100%";
    if (mean < minFillerSounds) return "0%";
    const position =
      ((mean - minFillerSounds) / (maxFillerSounds - minFillerSounds)) * 100;
    return `${position}%`;
  };

  const maxCount = Math.max(...baseParameterDetails.list.map((item) => Object.values(item)[0]));

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between font-medium">
        <p className="text-2xl text-headingDark font-semibold">Filler Sounds</p>

        <div className="flex flex-row justify-start gap-3 pt-1">
          <ProgressBarLinear score={baseParameterDetails.score} />
          <p className="text-textDark me-3">{baseParameterDetails.score} %</p>
        </div>
      </div>
      <p className="pt-5 text-start text-textLight">
        {fillerSounds.description}
      </p>

      {/* Benchmark Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Benchmarks</span>
        <div className="tooltip" data-tip="See pauses benchmark below">
          <IoIosInformationCircleOutline className="text-[16px] ms-1 mt-2" />
        </div>
      </p>
      <div className="flex justify-center w-full">
        <div className="w-7/12 mt-6">
          <div
            className="relative h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #8BCB7B 0%, #8BCB7B 60%, #F4470E 70%)",
            }}
          >
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "60%" }}
            ></div>
            <div className="absolute -top-6" style={{ left: "53%" }}>
              <span className="text-xs">3 Pauses</span>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-textLight">
            <span className="ms-[25%]">Good</span>
            <span className="me-[10%]">Poor</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Stats</span>
        <div className="tooltip" data-tip="See your average WPM below">
          <IoIosInformationCircleOutline className="text-[16px] ms-1 mt-2" />
        </div>
      </p>
      <div className="flex justify-center w-full mt-4">
        <div className="w-7/12 relative">
          <div
            className="h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #93A4E0 0%, #93A4E0 60%, #0B2176 70%)",
            }}
          ></div>
          <div
            className="absolute top-[-20px] transform -translate-x-1/2"
            style={{ left: getCursorPosition(baseParameterDetails.count) }}
          >
            <RiMapPin2Fill className="text-[#F4470E] text-xl" />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap mt-3">
              {baseParameterDetails.count > maxFillerSounds
                ? ">5 Sounds"
                : baseParameterDetails.count < minFillerSounds
                ? "undefined"
                : `${baseParameterDetails.count} Sounds`}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bars for Sounds */}
      <div className="mt-8 flex flex-wrap justify-between me-3">
        {baseParameterDetails.list.map((item) => {
          const [sound, count] = Object.entries(item)[0];
          const progressValue = (count / maxCount) * 100;
          const progressColorClass = count === maxCount ? 'progress-bad' : 'progress-basic';

          return (
            <div key={sound} className="flex items-center mt-4">
              <span className="text-textDark text-start font-medium w-12">{sound}</span>
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

export default FillerSoundsDetails;
