"use client";
import React, { ButtonHTMLAttributes, useContext } from "react";
import { useRouter } from "next/navigation";
import { chatContext } from "../chatContext";
import { request } from "../../../utils/request";
import { USER_IS_LOGGED_OUT } from "@/constants";
import { toast } from "react-toastify";
import { ROLE } from "../../../interfaces";

export const Button = ({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { errors, state, setState } = useContext(chatContext);
  const router = useRouter();

  const handleSubmit = () => {
    if (Object.keys(state).length === 0) {
      console.error("Please fill data!");
      return;
    }

    if (Object.keys(errors).length <= 0) {
      request("chat", "POST", { prompt: state.prompt?.trim?.() })
        .then((res) => {
          if (res === USER_IS_LOGGED_OUT) {
            toast.info("Please Login first!");
            router.replace("/login");
            return;
          }
          if (res == null || !res.ok) return;
          setState((prevState) => {
            const newMessages = [
              { role: ROLE.PROMPT, message: prevState.prompt },
              { role: ROLE.RESPONSE, message: res.json.data },
            ];

            return {
              ...prevState,
              messages: prevState.messages
                ? [...prevState.messages, ...newMessages]
                : newMessages,
              prompt: "",
            };
          });
        })
        .catch((err) => console.error("Error sending request => ", err));
    } else {
      console.error("Errors => ", errors);
    }
  };

  return (
    <button
      id="promptInputButton"
      {...rest}
      onClick={handleSubmit}
      disabled={state.prompt == null || state?.prompt?.trim?.()?.length == 0}
    >
      {children}
    </button>
  );
};
