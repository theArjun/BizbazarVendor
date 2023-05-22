import { useReducer } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";

const initialValues = {
  plan: "",
  imageChangeCount: 0,
};

const generalReducer = (state = initialValues, actions) => {
  switch (actions.type) {
    case "ACCOUNT_PLAN":
      return {
        ...state,
        plan: actions.value,
      };
    case "IMAGE_COUNT":
      return {
        ...state,
        imageChangeCount: actions.value,
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
  const setImageCount = ({ type, value }) => {
    dispatch({ type, value });
  };
  const stateAndMethods = {
    generalState,
    setPlan,
    setImageCount,
  };
  return (
    <GeneralContext.Provider value={stateAndMethods}>
      {children}
    </GeneralContext.Provider>
  );
};
