import React, { useContext } from "react";
import { LanguageContext } from "../contexts/language.context";
import { GrLanguage } from "react-icons/gr";

export default function LanguageToggle() {
  const { state, dispatch } = useContext(LanguageContext);

  const handleRTL = () => {
    console.log(state);
    if (state.lang == "en") {
      dispatch({ type: "ARABIC" });
    } else {
      dispatch({ type: "ENGLISH" });
    }
  };

  return (
    <>
      {state.lang == "en" ? (
        <button
          className="btn btn-sm rounded-full bg-highlight"
          onClick={handleRTL}
        >
          <GrLanguage />
          عربي
        </button>
      ) : (
        <button
          className="btn btn-sm rounded-full bg-highlight"
          onClick={handleRTL}
        >
          English
          <GrLanguage />
        </button>
      )}
    </>
  );
}
