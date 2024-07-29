import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import WpmDetails from "./WpmDetails";
import PausesDetail from "./PausesDetail";
import PitchDetails from "./PitchDetails";
import LoudnessDetails from "./LoudnessDetails";
import ClarityDetails from "./ClarityDetails";
import EyeContactDetails from "./EyeContactDetails";
import FillerSoundsDetails from "./FillerSoundsDetails";

const BaseParameterDetails = () => {
  const { baseParameter } = useContext(SessionReportContext);

  if (baseParameter == "wpm") {
    return <WpmDetails />;
  } else if (baseParameter == "pauses") {
    return <PausesDetail />;
  } else if (baseParameter == "pitch") {
    return <PitchDetails />;
  } else if (baseParameter == "loudness") {
    return <LoudnessDetails />;
  } else if (baseParameter == "clarity") {
    return <ClarityDetails />;
  } else if (baseParameter == "eye_contact") {
    return <EyeContactDetails />;
  } else if (baseParameter == "filler_sounds") {
    return <FillerSoundsDetails />;
  }  else {
    return (
      <div className="text-center py-24">
        Error! Do not having any data to display!
      </div>
    );
  }
};

export default BaseParameterDetails;
