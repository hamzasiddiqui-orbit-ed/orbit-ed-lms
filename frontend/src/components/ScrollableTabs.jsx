import React, { useState, useRef, useContext, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { UserReportContext } from "../contexts/userReport.context";

const ScrollableTabs = ({ reportData }) => {
  const { state: userReportState, dispatch: userReportDispatch } =
    useContext(UserReportContext);

  const [scrollPosition, setScrollPosition] = useState(0);
  const tabListRef = useRef(null);

  const derivedKeys = Object.keys(reportData.parameters.derived);
  const showScrollButtons = derivedKeys.length > 5;

  const scroll = (direction) => {
    const container = tabListRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  const handleTabClick = (key) => {
    userReportDispatch({ type: "SET_DERIVED_PARAMETER", payload: key });
  };

  return (
    <div className="w-full">
      <div className="mb-8 relative">
        <div className="flex items-center">
          {showScrollButtons && (
            <button
              onClick={() => scroll("left")}
              className="z-10 bg-core p-2 mr-2"
              style={{ display: scrollPosition > 0 ? "block" : "none" }}
            >
              <IoIosArrowBack />
            </button>
          )}

          <div className="relative flex-grow overflow-hidden">
            <div
              ref={tabListRef}
              className="tabs tabs-bordered whitespace-nowrap overflow-x-scroll scrollbar-hide"
              style={{ scrollBehavior: "smooth" }}
            >
              {derivedKeys.map((key) => (
                <a
                  key={key}
                  className={`tab ${
                    userReportState.derivedParameter === key ? "tab-active" : ""
                  }`}
                  onClick={() => handleTabClick(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              ))}
            </div>
          </div>

          {showScrollButtons && (
            <button
              onClick={() => scroll("right")}
              className="z-10 bg-core p-2 ml-2"
            >
              <IoIosArrowForward />
            </button>
          )}
        </div>

        <div className="tab-content p-10">
          {userReportState.derivedParameter && (
            <>
              <h3 className="text-lg font-semibold mb-4">
                {userReportState.derivedParameter.charAt(0).toUpperCase() +
                  userReportState.derivedParameter.slice(1)}
              </h3>
              <p>
                Content for {userReportState.derivedParameter} goes here. You
                can add any components or data visualization related to{" "}
                {userReportState.derivedParameter}.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollableTabs;
