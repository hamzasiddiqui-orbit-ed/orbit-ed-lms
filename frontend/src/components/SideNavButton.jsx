import React from "react";

function SideNavButton({ icon: Icon, text, children, onClick, className = "" }) {
  return (
    <li className="mb-3 w-100 me-4">
      <button
        className={`btn sm:btn-sm bg-sideNavBG shadow-sideNavBG sm:text-sm text-2xl text-textDark border-0 hover:text-textBlue hover:bg-sideNavHighlight px-3 w-full flex justify-start rounded-full ${className} ${
          className.includes("active") ? "text-textBlue bg-sideNavHighlight" : ""
        }`}
        onClick={onClick}
      >
        <Icon className="size-7 sm:size-5 me-5" />
        {text ? (
          <p className="font-light tracking-wide">{text}</p>
        ) : (
          children
        )}
      </button>
    </li>
  );
}

export default SideNavButton;
