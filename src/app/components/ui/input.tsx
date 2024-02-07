"use client";
import React, { InputHTMLAttributes, useContext, useState } from "react";
import { signUpFormContext } from "@/signup/signupContext";
import { request } from "../../../utils/request";

export const Input = ({
  className,
  id,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  if (!id) {
    console.error("id is required in input field!");
    return;
  }
  const { state, setState, errors, setErrorState } =
    useContext(signUpFormContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      request("check-username", "POST", { username: e.target.value })
        .then((res) => {
          console.log("response status ==> ", res);
          if (res.message === "Username is already in use!") {
            setErrorState((prevState) => ({ ...prevState, [id]: res.message }));
          }
        })
        .catch((err: any) => {
          console.error("Error is => ", err);
        });
    }
  };

  return (
    <>
      <input
        className={
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" +
          className
        }
        id={id}
        {...rest}
        onChange={handleChange}
        onBlur={handleBlur}
        value={state[id] || ""}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs italic">{errors[id]}</p>
      )}
    </>
  );
};
