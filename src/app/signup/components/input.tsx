"use client";
import "react-phone-number-input/style.css";
import React, {
  InputHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
} from "react";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
import { signUpFormContext } from "@/signup/signupContext";
import { checkUserName, request } from "../../../utils/request";
import { BUTTON_STATE } from "../../../interfaces";

export const Input = ({
  className,
  id,
  required,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  const { state, setState, errors, setErrorState } =
    useContext(signUpFormContext);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      submitButtonState: BUTTON_STATE.DISABLED,
    }));
    // setErrorState((prevState) => ({
    //   ...prevState,
    //   ...(required ? { [id]: "Please fill this field!" } : {}),
    // }));
  }, [setState]);
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
      case id === "confirmPassword" && state.password !== value:
        setErrorState((prevState) => ({
          ...prevState,
          [id]: "Confirm password must match the password",
        }));
        break;
      default:
        setErrorState((prevState) => {
          if (prevState[id]) {
            const { [id]: deletedError, ...newErrors } = prevState;
            return newErrors;
          }
          return prevState;
        });
    }

    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (id === "username") {
      checkUserName({ username: e.target.value })
        .then((res) => {
          if (res == null) throw new Error("Something went wrong!");
          if (!res.ok) {
            setErrorState((prevState) => ({
              ...prevState,
              [id]: res.json.message,
            }));
          }
        })
        .catch((err) => {
          toast.error("Error checking username!");
        });
    }
  };

  return (
    <>
      {id === "phoneNumber" ? (
        <PhoneInput
          className={
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" +
            className
          }
          value={state[id] || ""}
          onChange={(number) => {
            if (number == null) return;
            setState((prevState) => ({ ...prevState, [id]: number as string }));
          }}
        />
      ) : (
        <input
          className={
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" +
            className
          }
          id={id}
          required={required}
          {...rest}
          onChange={handleChange}
          onBlur={handleBlur}
          value={state[id] || ""}
        />
      )}

      {errors[id] && (
        <p className="text-red-500 text-xs italic">{errors[id]}</p>
      )}
    </>
  );
};
