import React, { createContext, useReducer } from "react";

const initialState = {
  lang: "en",
  layout: "ltr",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ENGLISH":
      return {
        ...state,
        lang: "en",
        layout: "ltr",
      };
    case "ARABIC":
      return {
        ...state,
        lang: "ar",
        layout: "rtl",
      };
    default:
      return state;
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <LanguageContext.Provider value={{state, dispatch}}>
            {children}
        </LanguageContext.Provider>
    )
}
