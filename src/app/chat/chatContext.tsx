"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const chatContext = createContext<{
  state: { [key: string]: any };
  errors: { [key: string]: string };
  setState: Dispatch<SetStateAction<{ [key: string]: any }>>;
  setErrorState: Dispatch<SetStateAction<{ [key: string]: string }>>;
}>({
  state: {},
  errors: {},
  setState: (v: any) => {},
  setErrorState: (v: any) => {},
});

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({});
  const [errorState, setErrorState] = useState({});
  return (
    <chatContext.Provider
      value={{ state, setState, errors: errorState, setErrorState }}
    >
      {children}
    </chatContext.Provider>
  );
};
