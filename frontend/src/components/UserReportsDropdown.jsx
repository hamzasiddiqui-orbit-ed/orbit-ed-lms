import classNames from "classnames";
import React, { useRef, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DropdownUserReport = ({
  title,
  dropDownData,
  handleDropDownExpand,
  handleDropDownSelect,
  sessions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredData = dropDownData.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="dropdown-content rounded-box z-[1] p-2 shadow bg-core w-60 max-h-64 overflow-y-auto">
        <label className="input input-sm input-bordered border-textLight flex items-center gap-2 mb-2">
          <input
            type="text"
            className="w-full"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoSearch className="text-textLight" />
        </label>

        <ul className="menu p-0">
          {filteredData.length ? (
            filteredData.map((item, index) => (
              <li key={index} className="text-start items-start">
                {sessions ? (
                  <button
                    className="text-textLight btn bg-core shadow-core border-0 hover:bg-sideNavBG w-full text-start"
                    onClick={() => handleSelectAndClose(item)}
                  >
                    Session {item}
                  </button>
                ) : (
                  <button
                    className="text-textLight btn bg-core shadow-core border-0 hover:bg-sideNavBG w-full text-start"
                    onClick={() => handleSelectAndClose(item)}
                  >
                    <p className="text-start w-full text-base">{item}</p>
                    {/* {item} */}
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
