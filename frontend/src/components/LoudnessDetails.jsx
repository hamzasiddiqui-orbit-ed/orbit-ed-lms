import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterDetails } from "../hooks/useReports";
import { loudness } from "../utils/baseParametersInfo";
import { RiMapPin2Fill } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
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

  const maxLoudness = 80;
  const minLoudness = 20;

  const getCursorPosition = (mean) => {
    if (mean > maxLoudness) return "100%";
    if (mean < minLoudness) return "0%";
    const position = ((mean - minLoudness) / (maxLoudness - minLoudness)) * 100;
    return `${position}%`;
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
        <div className="tooltip" data-tip="See Loudness (dB) benchmark below">
          <IoIosInformationCircleOutline className="text-[16px] ms-1 mt-2" />
        </div>
      </p>
      <div className="flex justify-center w-full">
        <div className="w-7/12 mt-6">
          <div
            className="relative h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #F4470E 45%, #8BCB7B 55%, #8BCB7B 73%, #F4470E 83%)",
            }}
          >
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "50%" }}
            ></div>
            <div
              className="absolute h-full w-[0.5px] bg-textDark"
              style={{ left: "78%" }}
            ></div>
            <div className="absolute -top-6" style={{ left: "45%" }}>
              <span className="text-xs">50 dB</span>
            </div>
            <div className="absolute -top-6" style={{ left: "73%" }}>
              <span className="text-xs">67 dB</span>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-textLight">
            <span className="ms-[15%]">Poor</span>
            <span className="me-[-5%]">Good</span>
            <span className="me-[8%]">Poor</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <p className="text-2xl text-headingDark font-semibold text-start mt-8 flex">
        <span>Stats</span>
        <div className="tooltip" data-tip="See your Loudness (dB) stats below">
          <IoIosInformationCircleOutline className="text-[16px] ms-1 mt-2" />
        </div>
      </p>
      <div className="flex justify-center w-full mt-4">
        <div className="w-7/12 relative">
          <div
            className="h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #0B2176 45%, #93A4E0 55%, #93A4E0 73%, #0B2176 83%)",
            }}
          ></div>
          <div
            className="absolute top-[-20px] transform -translate-x-1/2"
            style={{ left: getCursorPosition(baseParameterDetails.mean) }}
          >
            <RiMapPin2Fill className="text-[#F4470E] text-xl" />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap mt-3">
              {baseParameterDetails.mean > maxLoudness
                ? ">80 dB"
                : baseParameterDetails.mean < minLoudness
                ? "<20 dB"
                : `${baseParameterDetails.mean} dB`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoudnessDetails;
