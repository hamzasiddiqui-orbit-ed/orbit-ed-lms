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

      <div
        className={classNames(
          "dropdown-content rounded-box z-[1] p-2 shadow bg-core max-h-64 overflow-y-auto",
          {
            "w-40": sessions,
            "w-60": !sessions,
          }
        )}
      >
        <ul className="menu p-0">
          {dropDownData?.length ? (
            dropDownData.map((item, index) => (
              <li key={index} className="text-start items-start">
                {sessions ? (
                  <button
                    className="text-textLight btn bg-core shadow-core border-0 hover:bg-sideNavBG w-full text-start"
                    onClick={() => handleSelectAndClose(item)}
                  >
                    <p className="text-start w-full text-base">
                      Session {item}
                    </p>
                  </button>
                ) : (
                  <button
                    className="text-textLight btn bg-core shadow-core border-0 hover:bg-sideNavBG w-full text-start"
                    onClick={() => handleSelectAndClose(item)}
                  >
                    <p className="text-start w-full text-base">{item}</p>
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
      </div>
    </details>
  );
};

export default DropdownUserReport;
