"use client";
import React, { ButtonHTMLAttributes, useContext } from "react";
import { useRouter } from "next/navigation";
import { loginFormContext } from "../loginContext";
import { request } from "../../../utils/request";
import { BEARER_TOKEN, REFRESH_TOKEN, USER_IS_LOGGED_OUT } from "@/constants";

export const Button = ({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { errors, state } = useContext(loginFormContext);
  const router = useRouter();

  const handleSubmit = () => {
    if (Object.keys(state).length === 0) {
      console.error("Please fill data!");
      return;
    }

    if (Object.keys(errors).length <= 0) {
      request("login", "POST", {
        ...state,
        ...(state.emailOrUsername?.includes("@")
          ? { email: state.emailOrUsername }
          : { username: state.emailOrUsername }),
      })
        .then((res) => {
          if (res == null || res === USER_IS_LOGGED_OUT || !res.ok) return;
          localStorage.setItem(
            BEARER_TOKEN,
            res.json?.data?.bearer?.token ?? ""
          );
          localStorage.setItem(
            REFRESH_TOKEN,
            res.json?.data?.refresh?.token ?? ""
          );
          router.replace("/");
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
