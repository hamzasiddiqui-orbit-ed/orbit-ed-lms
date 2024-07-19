import React, { createContext, useReducer } from "react";

const initialState = {
  moduleName: null,
  sessionCount: null,
  derivedParameter: null,
  baseParameter: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MODULE_NAME":
      return {
        ...state,
        moduleName: action.payload,
        sessionCount: null,
        derivedParameter: null,
        baseParameter: null,
      };
    case "SET_SESSION_COUNT":
      return {
        ...state,
        sessionCount: action.payload,
        derivedParameter: null,
        baseParameter: null,
      };
    case "SET_DERIVED_PARAMETER":
      return {
        ...state,
        derivedParameter: action.payload,
        baseParameter: null,
      }
    case "SET_BASE_PARAMETER":
      return {
        ...state,
        derivedParameter: null,
        baseParameter: action.payload
      }
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
