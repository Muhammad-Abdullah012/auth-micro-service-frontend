"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const authContext = createContext<{
  state: { [key: string]: string };
  errors: { [key: string]: string };
  setState: Dispatch<SetStateAction<{ [key: string]: string }>>;
  setErrorState: Dispatch<SetStateAction<{ [key: string]: string }>>;
}>({
  state: {},
  errors: {},
  setState: (v: any) => {},
  setErrorState: (v: any) => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({});
  const [errorState, setErrorState] = useState({});
  return (
    <authContext.Provider
      value={{ state, setState, errors: errorState, setErrorState }}
    >
      {children}
    </authContext.Provider>
  );
};
