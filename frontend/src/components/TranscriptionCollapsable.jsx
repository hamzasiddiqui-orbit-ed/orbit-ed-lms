import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const TranscriptionCollapsable = ({ transcription }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-core p-2 ps-0 rounded">
      <a
        className="link link-hover text-xs font-normal cursor-pointer flex flex-row mb-2 text-textDark"
        onClick={toggleCollapse}
      >
        Show Transcription{" "}
        {isCollapsed ? (
          <IoIosArrowDown className="mt-[2px] ms-1" />
        ) : (
          <IoIosArrowUp className="mt-[2px] ms-1" />
        )}
      </a>
      <div
        className={`custom-scrollbar transition-max-height duration-300 ease-in-out ${
          isCollapsed ? "max-h-0 overflow-hidden" : "max-h-48 overflow-y-auto"
        }`}
        style={{
          maxHeight: isCollapsed ? "0" : "12rem",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        <p className="text-textLight text-sm font-normal px-2">{transcription}</p>
      </div>
    </div>
  );
};

export default TranscriptionCollapsable;
