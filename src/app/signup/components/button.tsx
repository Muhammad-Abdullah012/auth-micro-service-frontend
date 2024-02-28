"use client";
import React, { ButtonHTMLAttributes, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signUpFormContext } from "@/signup/signupContext";
import { request } from "../../../utils/request";
import { BEARER_TOKEN, REFRESH_TOKEN, USER_IS_LOGGED_OUT } from "@/constants";
import { BUTTON_STATE } from "../../../interfaces";
import { authContext } from "@/components/auth/authContext";

export const Button = ({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { errors, state, setErrorState, setState } = useContext(authContext);
  const router = useRouter();

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    const requiredFields: boolean[] = [];
    inputs.forEach((i) => {
      requiredFields.push(i.required && !i.value);
    });
    if (requiredFields.some((v) => v)) {
      setState((prev) => ({
        ...prev,
        submitButtonState: BUTTON_STATE.DISABLED,
      }));
    }
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const inputs = document.querySelectorAll("input");
    // const requiredFields: boolean[] = [];
    // inputs.forEach((i) => {
    //   requiredFields.push(i.required && !i.value);
    //   if (i.required && !i.value) {
    //     setErrorState((prevState) => ({
    //       ...prevState,
    //       [i.id]: "Please fill this field!",
    //     }));
    //   }
    // });
    // if (requiredFields.some((v) => v)) return;
    e.preventDefault();
    // if (Object.keys(state).length === 0) {
    //   console.error("Please fill data!");
    //   return;
    // }

    if (Object.keys(errors).length <= 0) {
      request("signup", "POST", state)
        .then((res) => {
          if (res == null || res === USER_IS_LOGGED_OUT) return;
          if (!res.ok) {
            toast.error(res.json.message);
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
          console.log("Response from backend ==> ", res);
          router.replace("/chat");
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
