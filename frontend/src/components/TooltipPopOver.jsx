import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";

const TooltipPopOver = ({ text, align }) => {

  const getTooltipClass = (align) => {
    if (align == 'middle') {
      return "pointer-events-none absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 opacity-0 transition-opacity group-hover:opacity-100 bg-sideNavBG rounded-xl p-2 text-sm text-textDark whitespace-normal"
    } else if (align == 'left') {
      return "pointer-events-none absolute bottom-full left-1/2 transform -translate-x-[90%] mb-2 w-60 opacity-0 transition-opacity group-hover:opacity-100 bg-sideNavBG rounded-xl p-2 text-sm text-textDark whitespace-normal"
    } else {
      return "pointer-events-none absolute bottom-full left-1/2 transform -translate-x-[10%] mb-2 w-60 opacity-0 transition-opacity group-hover:opacity-100 bg-sideNavBG rounded-xl p-2 text-sm text-textDark whitespace-normal"
    }
  }

  return (
    <div className="group relative w-max">
          <IoIosInformationCircleOutline className="text-[16px] ms-1 mt-[10px]" />
          <span className={getTooltipClass(align)}>
            {text}
          </span>
        </div>
  )
}

export default TooltipPopOver