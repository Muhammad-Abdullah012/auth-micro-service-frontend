"use client";
import React, {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { BUTTON_STATE } from "../../../interfaces";
import { authContext } from "@/components/auth/authContext";

export const Input = ({
  className,
  required,
  id,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  const { state, setState, setErrorState, errors } = useContext(authContext);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      submitButtonState: BUTTON_STATE.DISABLED,
    }));
    // setErrorState((prevState) => ({
    //   ...prevState,
    //   ...(required ? { [id]: "Please fill this field!" } : {}),
    // }));
  }, []);

  const resetErrors = useCallback(() => {
    if (!id) {
      console.error("id is required in input field!");
      return;
    }
    setErrorState((prevState) => {
      if (prevState[id]) {
        const { [id]: deletedError, ...newErrors } = prevState;
        return newErrors;
      }
      return prevState;
    });
  }, [id, setErrorState]);

  const enableButtonState = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      submitButtonState: BUTTON_STATE.ENABLED,
    }));
  }, [setState]);

  if (!id) {
    console.error("id is required in input field!");
    return;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    enableButtonState();
    const { value } = event.target;

    switch (true) {
      case id === "password" && value.length < 9:
        setErrorState((prevState) => ({
          ...prevState,
          [id]: "Password must be atleast 9 characters long!",
        }));
        break;
      default:
        resetErrors();
    }

    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <>
      <input
        className={
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" +
          className
        }
        id={id}
        required={required}
        {...rest}
        onChange={handleChange}
        value={state[id] || ""}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs italic">{errors[id]}</p>
      )}
    </>
  );
};
