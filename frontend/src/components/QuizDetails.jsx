import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { RiArrowGoBackFill } from "react-icons/ri";

const QuizDetails = () => {
  const { setShowQuiz } = useContext(SessionReportContext);

  const handleQuizDetailsClose = () => {
    setShowQuiz(false);
  };

  return (
    <>
      <div className="flex flex-col items-center ms-10">hello</div>
      <div className="w-9/12 text-start">
        <div className="flex flex-row justify-between">
          <h2 className="text-headingDark font-semibold text-2xl mb-2">
            Quiz Details
          </h2>
          <button
            className="btn btn-sm rounded-full border-0 shadow-core bg-core text-headingDark hover:bg-sideNavBG hover:text-brand"
            onClick={handleQuizDetailsClose}
          >
            <RiArrowGoBackFill size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizDetails;
