"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const signUpFormContext = createContext<{
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

export const SignUpFormContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState({});
  const [errorState, setErrorState] = useState({});
  return (
    <signUpFormContext.Provider
      value={{ state, setState, errors: errorState, setErrorState }}
    >
      {children}
    </signUpFormContext.Provider>
  );
};
