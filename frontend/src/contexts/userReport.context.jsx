import React, { createContext, useReducer } from "react";

const initialState = {
  moduleName: null,
  sessionCount: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MODULE_NAME":
      return {
        ...state,
        moduleName: action.payload,
      };
    case "SET_SESSION_COUNT":
      return {
        ...state,
        sessionCount: action.payload,
      };
    default:
      return state;
  }
};

export const UserReportContext = createContext();

export const UserReportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserReportContext.Provider value={{ state, dispatch }}>
      {children}
    </UserReportContext.Provider>
  );
};
