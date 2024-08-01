import React, { useState, useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useNavigate } from "react-router-dom";
import { FaSort } from "react-icons/fa6";
import { FaSortDown } from "react-icons/fa6";
import { FaSortUp } from "react-icons/fa6";

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

  const getButtonClass = (sortBy) => {
    if (sort)
      return "btn btn-xs shadow-sideNavHighlight rounded-full px-1 ms-1 bg-sideNavHighlight text-textDark hover:bg-progressBasic hover:text-textDark border-0";
    return "btn btn-xs shadow-sideNavHighlight rounded-full px-1 ms-1 hover:bg-progressBasic hover:text-textDark border-0";
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
            <table className="w-full text-sm text-left text-textDark">
              <thead className="text-xs uppercase bg-sideNavHighlight border-b border-sideNavHighlight rounded-t-lg">
                <tr className="h-14">
                  <th className="px-3 py-3">
                    <div className="flex items-center justify-center">
                      Session no.
                      <button
                        className={getButtonClass("sessionCount")}
                        onClick={() => handleSort("sessionCount")}
                      >
                        {getSortIcon("sessionCount")}
                      </button>
                    </div>
                  </th>
                  {!moduleName && (
                    <th className="px-3 py-3">
                      <div className="flex items-center justify-center">
                        Module Name
                        <button
                          className={getButtonClass("moduleName")}
                          onClick={() => handleSort("moduleName")}
                        >
                          {getSortIcon("moduleName")}
                        </button>
                      </div>
                    </th>
                  )}
                  <th className="px-3 py-3">
                    <div className="flex items-center justify-center">
                      Date Taken
                      <button
                        className={getButtonClass("dateTaken")}
                        onClick={() => handleSort("dateTaken")}
                      >
                        {getSortIcon("dateTaken")}
                      </button>
                    </div>
                  </th>
                  <th className="px-3 py-3">
                    <div className="flex items-center justify-center">
                      Duration
                      <button
                        className={getButtonClass("duration")}
                        onClick={() => handleSort("duration")}
                      >
                        {getSortIcon("duration")}
                      </button>
                    </div>
                  </th>
                  <th className="px-3 py-3">
                    <div className="flex items-center justify-center">
                      Cumulative Score
                      <button
                        className={getButtonClass("sessionScore")}
                        onClick={() => handleSort("sessionScore")}
                      >
                        {getSortIcon("sessionScore")}
                      </button>
                    </div>
                  </th>
                  <th className="px-3 py-3">
                    <div className="flex items-center justify-center">
                      Quiz Score
                      <button
                        className={getButtonClass("quizScore")}
                        onClick={() => handleSort("quizScore")}
                      >
                        {getSortIcon("quizScore")}
                      </button>
                    </div>
                  </th>
                  <th className="px-3 py-3">
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
                      <td className="px-3 py-4 text-center">
                        {report.sessionCount}
                      </td>
                      {!moduleName && (
                        <td className="px-3 py-4 text-center">
                          {report.moduleName}
                        </td>
                      )}
                      <td className="px-3 py-4 text-center">
                        {report.dateTaken}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {report.duration}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {report.sessionScore}%
                      </td>
                      <td className="px-3 py-4 text-center">
                        {report.quizScore}%
                      </td>
                      <td className="px-3 py-4 w-52 text-justify">
                        {report.transcript.length > 40 ? (
                          <>
                            {`${report.transcript.substr(0, 40)}... `}
                            <a
                              href="#transcript_modal"
                              className="text-xs"
                              onClick={(event) =>
                                handleShowMoreClick(event, report)
                              }
                            >
                              Show more
                            </a>
                            <div
                              className="modal"
                              role="dialog"
                              id="transcript_modal"
                              // Prevents closing the modal from triggering row click
                              onClick={(event) => event.stopPropagation()}
                            >
                              <div className="modal-box">
                                {selectedReport && (
                                  <>
                                    <h3 className="text-lg font-bold flex justify-between">
                                      <p>{selectedReport.moduleName}</p>
                                      <p>Session {selectedReport.sessionCount}</p>
                                    </h3>
                                    <h4 className="text-base font-bold pt-3">
                                      Transcription
                                    </h4>
                                    <p className="py-4 text-base">
                                      {selectedReport.transcript}
                                    </p>
                                    <div className="modal-action">
                                      <a
                                        href="#"
                                        className="btn btn-sm bg-sideNavHighlight border-0 hover:bg-sideNavBG hover:text-textDark"
                                        onClick={(event) =>
                                          // Prevents closing the modal from triggering row click
                                          event.stopPropagation()
                                        }
                                      >
                                        Close
                                      </a>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
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
