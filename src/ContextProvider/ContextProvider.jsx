import { useReducer } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";

const initialValues = {
  plan: "",
};

const generalReducer = (state = initialValues, actions) => {
  switch (actions.type) {
    case "ACCOUNT_PLAN":
      return {
        ...state,
        plan: actions.value,
      };
    default:
      return state;
  }
};

export const GeneralContext = createContext(null);

export const useGeneralContext = () => useContext(GeneralContext);

export const GeneralContextProvider = ({ children }) => {
  const [generalState, dispatch] = useReducer(generalReducer, initialValues);
  const setPlan = ({ type, value }) => {
    dispatch({ type, value });
  };
  const stateAndMethods = {
    generalState,
    setPlan,
  };
  return (
    <GeneralContext.Provider value={stateAndMethods}>
      {children}
    </GeneralContext.Provider>
  );
};
