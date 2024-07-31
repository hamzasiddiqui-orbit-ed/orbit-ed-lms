import classNames from "classnames";
import React, { useRef, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DropdownUserReport = ({
  title,
  dropDownData,
  handleDropDownExpand,
  handleDropDownSelect,
  sessions,
}) => {
  const detailsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        detailsRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectAndClose = (moduleName) => {
    handleDropDownSelect(moduleName);
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  const handleSummaryClick = (e) => {
    e.preventDefault();
    handleDropDownExpand();
    if (detailsRef.current) {
      detailsRef.current.setAttribute("open", "");
    }
  };

  return (
    <details className="dropdown" ref={detailsRef}>
      <summary
        className={classNames(
          "btn btn-sm bg-core border-0 shadow-core text-textLight font-normal hover:bg-sideNavBG",
          { "text-base": sessions == true },
          { "text-xl": sessions == false }
        )}
        onClick={handleSummaryClick}
      >
        {title}
        <MdOutlineKeyboardArrowDown />
      </summary>
      <ul className="menu dropdown-content rounded-box z-[1] p-2 shadow bg-core">
        {dropDownData?.length ? (
          dropDownData.map((item, index) => (
            <li key={index}>
              {sessions ? (
                <button
                  className="text-textLight btn bg-core shadow-core border-0 hover:bg-sideNavBG"
                  onClick={() => handleSelectAndClose(item)}
                >
                  Session {item}
                </button>
              ) : (
                <button
                  className="text-textLight btn bg-core shadow-core border-0 hover:bg-sideNavBG"
                  onClick={() => handleSelectAndClose(item)}
                >
                  {item}
                </button>
              )}
            </li>
          ))
        ) : (
          <li>
            <span className="text-textLight">No data available</span>
          </li>
        )}
      </ul>
    </details>
  );
};

export default DropdownUserReport;