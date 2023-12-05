import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("users")) || null,
  isFetching: false,
  isError: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
