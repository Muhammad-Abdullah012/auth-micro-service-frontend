"use client";
import React, { ButtonHTMLAttributes, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { loginFormContext } from "../loginContext";
import { request } from "../../../utils/request";
import { BEARER_TOKEN, REFRESH_TOKEN, USER_IS_LOGGED_OUT } from "@/constants";
import { BUTTON_STATE } from "../../../interfaces";

export const Button = ({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { errors, state, setErrorState } = useContext(loginFormContext);
  const router = useRouter();

  const handleSubmit = () => {
    const inputs = document.querySelectorAll("input");
    const requiredFields: boolean[] = [];
    inputs.forEach((i) => {
      requiredFields.push(i.required && !i.value);
      if (i.required && !i.value) {
        setErrorState((prevState) => ({
          ...prevState,
          [i.id]: "Please fill this field!",
        }));
      }
    });
    if (requiredFields.some((v) => v)) return;
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
          if (res == null || res === USER_IS_LOGGED_OUT) return;
          if (!res.ok && res.json?.message) {
            toast.error(res.json?.message);
            return;
          }
          if (!res.ok) {
            return;
          }
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
  const isButtonDisabled =
    Object.keys(errors).length > 0 ||
    state.submitButtonState === BUTTON_STATE.DISABLED;
  return (
    <button
      {...rest}
      onClick={handleSubmit}
      style={{ cursor: isButtonDisabled ? "not-allowed" : "pointer" }}
      disabled={isButtonDisabled}
    >
      {children}
    </button>
  );
};
