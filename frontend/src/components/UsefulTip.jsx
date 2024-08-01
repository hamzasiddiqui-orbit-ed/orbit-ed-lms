import React from "react";

const UsefulTip = ({ heading='Heading Placeholder', description='Description Placeholder'}) => {
  return (
    <div>
      <p className="text-2xl text-headingDark font-semibold text-start mt-3 mb-5 flex">
        <span>Useful Tip</span>
        {/* <TooltipPopOver
          text="Sample text for Performance over time."
          align="left"
        /> */}
      </p>
      <div className="card bg-[#C6CFEE] shadow-xl border-textDark border-r-2 border-b-2 text-start">
        <div className="card-body p-5">
          <h3 className="card-title">{heading}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default UsefulTip;
