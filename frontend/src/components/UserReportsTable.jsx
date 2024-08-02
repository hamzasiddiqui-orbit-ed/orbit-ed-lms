import React, { useState, useContext, useRef, useEffect } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useNavigate } from "react-router-dom";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";

const UserReportsTable = ({
  reportsList,
  moduleName,
  page,
  handlePageChange,
  sort,
  handleSort,
}) => {
  const navigate = useNavigate();
  const { setSelectedModule, setSelectedSessionCount } =
    useContext(SessionReportContext);

  const [selectedReport, setSelectedReport] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedReport(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getButtonClass = (sortBy) => {
    console.log(`SORT == ${sort}`);
    console.log(`SORTBY == ${sortBy}`);

    if (sort === sortBy + "Asc" || sort === sortBy + "Desc")
      return "px-3 py-3 bg-progressBasic hover:bg-sideNavHighlight hover:cursor-pointer";
    return "px-3 py-3 hover:bg-sideNavHighlight hover:cursor-pointer";
  };

  const getSortIcon = (sortBy) => {
    if (sort === sortBy + "Asc") return <FaSortUp size={12} />;
    if (sort === sortBy + "Desc") return <FaSortDown size={12} />;
    return <FaSort size={12} />;
  };

  const handleShowMoreClick = (event, report) => {
    event.stopPropagation();
    setSelectedReport(report);
  };

  const handleRowClick = (report) => {
    setSelectedModule(report.moduleName);
    setSelectedSessionCount(report.sessionCount);
    navigate("/learner-dashboard/my-dashboard");
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg shadow">
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-textDark table-fixed">
              <thead className="text-xs uppercase bg-sideNavBG border-b border-sideNavBG rounded-t-lg">
                <tr className="h-14">
                  <th
                    className={`${getButtonClass("sessionCount")} w-20`}
                    onClick={() => handleSort("sessionCount")}
                  >
                    <div className="flex items-center justify-center">
                      <p className="me-2">Session</p>
                      {getSortIcon("sessionCount")}
                    </div>
                  </th>
                  {!moduleName && (
                    <th
                      className={`${getButtonClass("moduleName")} w-48`}
                      onClick={() => handleSort("moduleName")}
                    >
                      <div className="flex items-center justify-center">
                        <p className="me-2">Module Name</p>
                        {getSortIcon("moduleName")}
                      </div>
                    </th>
                  )}
                  <th
                    className={`${getButtonClass("dateTaken")} w-32`}
                    onClick={() => handleSort("dateTaken")}
                  >
                    <div className="flex items-center justify-center">
                      <p className="me-2">Date Taken</p>
                      {getSortIcon("dateTaken")}
                    </div>
                  </th>
                  <th
                    className={`${getButtonClass("duration")} w-24`}
                    onClick={() => handleSort("duration")}
                  >
                    <div className="flex items-center justify-center">
                      <p className="me-2">Duration</p>
                      {getSortIcon("duration")}
                    </div>
                  </th>
                  <th
                    className={`${getButtonClass("sessionScore")} w-40`}
                    onClick={() => handleSort("sessionScore")}
                  >
                    <div className="flex items-center justify-center">
                      <p className="me-3">Cumulative Score</p>
                      {getSortIcon("sessionScore")}
                    </div>
                  </th>
                  <th
                    className={`${getButtonClass("quizScore")} w-32`}
                    onClick={() => handleSort("quizScore")}
                  >
                    <div className="flex items-center justify-center">
                      <p className="me-3">Quiz Score</p>
                      {getSortIcon("quizScore")}
                    </div>
                  </th>
                  <th className="px-3 py-3 w-64">
                    <div className="flex items-center justify-center">
                      Transcript
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="rounded-b-lg">
                {reportsList?.reports?.length > 0 ? (
                  reportsList.reports.map((report, index) => (
                    <tr
                      key={index}
                      className={`border-b bg-core hover:bg-sideNavHighlight hover:cursor-pointer`}
                      onClick={() => handleRowClick(report)}
                    >
                      <td className="px-3 py-4 text-center whitespace-normal max-h-20 overflow-y-auto">
                        {report.sessionCount}
                      </td>
                      {!moduleName && (
                        <td className="px-3 py-4 text-center whitespace-normal max-h-20 overflow-y-auto">
                          {report.moduleName}
                        </td>
                      )}
                      <td className="px-3 py-4 text-center whitespace-normal max-h-20 overflow-y-auto">
                        {report.dateTaken}
                      </td>
                      <td className="px-3 py-4 text-center whitespace-normal max-h-20 overflow-y-auto">
                        {report.duration}
                      </td>
                      <td className="px-3 py-4 text-center whitespace-normal max-h-20 overflow-y-auto">
                        {report.sessionScore}%
                      </td>
                      <td className="px-3 py-4 text-center whitespace-normal max-h-20 overflow-y-auto">
                        {report.quizScore}%
                      </td>
                      <td className="px-3 py-4 w-64 text-justify whitespace-normal max-h-20 overflow-y-auto">
                        {report.transcript.length > 70 ? (
                          <>
                            {`${report.transcript.substr(0, 70)}... `}
                            <a
                              href="#transcript_modal"
                              className="text-xs text-brand hover:underline hover:text-brand"
                              onClick={(event) =>
                                handleShowMoreClick(event, report)
                              }
                            >
                              Show more
                            </a>
                            {selectedReport && (
                              <div
                                className="modal hover:cursor-default"
                                role="dialog"
                                id="transcript_modal"
                              >
                                <div
                                  className="modal-box max-w-5xl hover:cursor-default m-0 p-0"
                                  ref={modalRef}
                                  // Prevents closing the modal from triggering row click
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  <div className="flex flex-col sticky top-0 bg-core m-0 p-5">
                                    <h1 className="text-lg font-bold flex justify-between">
                                      <p>
                                        {selectedReport.moduleName} - Session{" "}
                                        {selectedReport.sessionCount}
                                      </p>
                                      <div className="modal-action m-0 p-0">
                                        <a
                                          href="#"
                                          className="btn btn-sm bg-sideNavBG border-0 hover:bg-sideNavHighlight hover:text-textDark"
                                          onClick={(event) => {
                                            // Prevents closing the modal from triggering row click
                                            event.stopPropagation();
                                            setSelectedReport(null);
                                          }}
                                        >
                                          Close
                                        </a>
                                      </div>
                                    </h1>
                                    <h4 className="text-base font-bold pt-2">
                                      Transcription
                                    </h4>
                                  </div>
                                  <p className="text-base bg-sideNavBG p-4 mx-5 mb-5 rounded-2xl">
                                    {selectedReport.transcript}
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          report.transcript
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={!moduleName ? "7" : "6"}
                      className="px-6 py-4 text-center"
                    >
                      No reports found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 text-textDark">
        <div className="inline-flex rounded-md shadow" role="group">
          <button
            className="px-2 py-1 text-sm font-medium bg-core border border-gray-200 rounded-l-lg hover:bg-sideNavHighlight disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            &lt;&lt;
          </button>

          <button
            className={`px-2 py-1 text-sm font-medium border border-gray-200 hover:bg-blue-100 ${
              page === 1 ? "bg-progressBasic" : "bg-core"
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>

          {page > 3 && (
            <button className="px-2 py-1 text-sm font-medium bg-core border border-gray-200 cursor-default">
              ...
            </button>
          )}

          {page > 2 && page < reportsList.totalPages && (
            <button
              className="px-2 py-1 text-sm font-medium bg-sideNavHighlight border border-gray-200 hover:bg-progressBasic"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )}

          {page < reportsList.totalPages - 2 && (
            <button className="px-2 py-1 text-sm font-medium bg-core border border-gray-200 cursor-default">
              ...
            </button>
          )}

          {reportsList.totalPages > 1 && (
            <button
              className={`px-2 py-1 text-sm font-medium border border-gray-200 hover:bg-sideNavHighlight ${
                page === reportsList.totalPages
                  ? "bg-progressBasic"
                  : "bg-white"
              }`}
              onClick={() => handlePageChange(reportsList.totalPages)}
            >
              {reportsList.totalPages}
            </button>
          )}

          <button
            className="px-2 py-1 text-sm font-medium bg-core border border-gray-200 rounded-r-lg hover:bg-sideNavHighlight disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              handlePageChange(Math.min(reportsList.totalPages, page + 1))
            }
            disabled={page === reportsList.totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default UserReportsTable;
