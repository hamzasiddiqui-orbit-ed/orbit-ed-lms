import classNames from "classnames";
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DropdownUserReport = ({
  title,
  dropDownData,
  handleDropDownExpand,
  handleDropDownSelect,
  sessions,
}) => {
  const detailsRef = React.useRef(null);

  const handleSelectAndClose = (moduleName) => {
    handleDropDownSelect(moduleName);
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
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
        onClick={handleDropDownExpand}
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
