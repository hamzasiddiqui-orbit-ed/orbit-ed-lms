import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterDetails } from "../hooks/useReports";
import { wpm } from "../utils/baseParametersInfo";
import { RiMapPin2Fill } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ProgressBarLinear from "./ProgressBarLinear";

const WpmDetails = () => {
  const { reportId, baseParameter } = useContext(SessionReportContext);

  const { data, isPending, isError } = useBaseParameterDetails(
    reportId,
    baseParameter
  );

  if (data) {
    var baseParameterDetails = data.data["wpm"];
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

  const maxWpm = 250;
  const minWpm = 50;

  const getCursorPosition = (mean) => {
    if (mean > maxWpm) return "100%";
    if (mean < minWpm) return "0%";
    const position = ((mean - minWpm) / (maxWpm - minWpm)) * 100;
    return `${position}%`;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between font-medium">
        <p className="text-2xl text-headingDark font-semibold">
          Words per Minute
        </p>

        <div className="flex flex-row justify-start gap-3 pt-1">
          <ProgressBarLinear score={baseParameterDetails.score} />
          <p className="text-textDark me-3">{baseParameterDetails.score} %</p>
        </div>
      </div>
      <p className="pt-5 text-start text-textLight">{wpm.description}</p>

      {/* Benchmark Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Benchmarks</span>
        <div className="tooltip" data-tip="See WPM benchmark below">
          <IoIosInformationCircleOutline className="text-[16px] ms-1 mt-2" />
        </div>
      </p>
      <div className="flex justify-center w-full">
        <div className="w-7/12 mt-6">
          <div
            className="relative h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #F4470E 25%, #8BCB7B 37.5%, #8BCB7B 52%, #F4470E 65%)",
            }}
          >
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "35%" }}
            ></div>
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "55%" }}
            ></div>
            <div className="absolute -top-6" style={{ left: "30%" }}>
              <span className="text-xs">120 wpm</span>
            </div>
            <div className="absolute -top-6" style={{ left: "50%" }}>
              <span className="text-xs">160 wpm</span>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-textLight">
            <span>Poor</span>
            <span className="mr-[10%]">Good</span>
            <span>Poor</span>
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
                "linear-gradient(90deg, #0B2176 25%, #93A4E0 37.5%, #93A4E0 52%, #0B2176 65%)",
            }}
          ></div>
          <div
            className="absolute top-[-20px] transform -translate-x-1/2"
            style={{ left: getCursorPosition(baseParameterDetails.mean) }}
          >
            <RiMapPin2Fill className="text-[#F4470E] text-xl" />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap mt-3">
              {baseParameterDetails.mean > maxWpm
                ? ">250 wpm"
                : baseParameterDetails.mean < minWpm
                ? "<50 wpm"
                : `${baseParameterDetails.mean} wpm`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WpmDetails;
