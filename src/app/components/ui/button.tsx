"use client";
import React, { ButtonHTMLAttributes, useContext } from "react";
import { signUpFormContext } from "@/signup/signupContext";
import { request } from "../../../utils/request";

export const Button = ({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { errors, state } = useContext(signUpFormContext);
  const handleSubmit = () => {
    if (Object.keys(state).length === 0) {
      console.error("Please fill data!");
      return;
    }

    if (Object.keys(errors).length <= 0) {
      request("signup", "POST", { ...state })
        .then((res: any) => {
          console.log("Response from backend ==> ", res);
        })
        .catch((err) => console.error("Error sending request => ", err));

      // Now submit data to backend signup endpoint
    } else {
      console.error("Errors => ", errors);
    }
  };
  return (
    <button
      {...rest}
      onClick={handleSubmit}
      disabled={Object.keys(errors).length > 0}
    >
      {children}
    </button>
  );
};
