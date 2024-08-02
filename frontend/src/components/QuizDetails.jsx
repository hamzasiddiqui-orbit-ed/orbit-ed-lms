import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useQuizDetails } from "../hooks/useReports";
import RadialProgressUserReport from "./RadialProgressUserReport";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const QuizDetails = () => {
  const { reportId, setShowQuiz } = useContext(SessionReportContext);

  const handleQuizDetailsClose = () => {
    setShowQuiz(false);
  };

  const { data, isPending, isError } = useQuizDetails(reportId);

  if (data) {
    console.log(JSON.stringify(data.data));
  }

  if (isPending) {
    return (
      <>
        <div className="flex flex-col">
          <div className="skeleton bg-slate-200 h-44 w-44 shrink-0 rounded-full ms-10"></div>
          <div className="skeleton bg-slate-200 h-10 mt-5 ms-10"></div>
          <div className="skeleton bg-slate-200 h-10 mt-5 ms-10"></div>
        </div>
        <div className="skeleton bg-slate-200 h-80 w-8/12 ms-10"></div>
      </>
    );
  }

  if (isError) {
    return <div>Error loading quiz details</div>;
  }

  const renderScoreBreakdown = (questions) => {
    return questions.map((q, index) => (
      <span key={q._id}>
        {q.selected_option === q.correct_option ? (
          <FaCircleCheck className="text-progressGood" />
        ) : (
          <FaCircleXmark className="text-progressBad" />
        )}
      </span>
    ));
  };

  const renderQuestions = (questions) => {
    return questions.map((q, index) => (
      <div key={q._id} className="card bg-sideNavBG mb-4">
        <div className="card-body p-4">
          <p className="font-semibold text-textDark">{q.question_text}</p>
          <div className="ml-0 text-textDark">
            {q.options.map((option, optionIndex) => (
              <p
                key={optionIndex}
                className={`${
                  q.selected_option === option
                    ? q.selected_option === q.correct_option
                      ? "text-green-500"
                      : "text-red-500"
                    : ""
                }`}
              >
                {String.fromCharCode(65 + optionIndex)}) {option}
              </p>
            ))}
            <div className="text-textDark mt-3 flex">
              Answer:
              <p className="text-green-500 ms-2">
                {String.fromCharCode(65 + q.options.indexOf(q.correct_option))}){" "}
                {q.correct_option}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex mb-6 text-start w-full justify-start">
      <div className="ms-10">
        <RadialProgressUserReport totalScore={data.data.quiz_score} quiz={true} />

        <h2 className="text-headingDark font-semibold text-lg mb-2 mt-5">
          Score Breakdown
        </h2>

        <div className="mb-4">
          <h3 className="font-base mb-2 text-textDark text-sm">
            Multiple Choice
          </h3>
          <div className="flex space-x-1">
            {renderScoreBreakdown(data.data.quiz_details.MCQ)}
          </div>
        </div>
        <div>
          <h3 className="font-base mb-2 text-textDark text-sm pt-2">
            True/False
          </h3>
          <div className="flex space-x-1">
            {renderScoreBreakdown(data.data.quiz_details.TF)}
          </div>
        </div>
      </div>

      <div className="w-8/12 bg-core ms-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headingDark font-semibold text-2xl mb-2 pt-0 mt-0">
            Quiz Details
          </h2>
          <button
            className="btn btn-sm rounded-full border-0 shadow-core bg-core text-headingDark hover:bg-sideNavBG hover:text-brand"
            onClick={handleQuizDetailsClose}
          >
            <RiArrowGoBackFill size={20} />
          </button>
        </div>

        {renderQuestions([
          ...data.data.quiz_details.MCQ,
          ...data.data.quiz_details.TF,
        ])}
      </div>
    </div>
  );
};

export default QuizDetails;
