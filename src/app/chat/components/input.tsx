"use client";
import React, {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { chatContext } from "../chatContext";

export const Input = ({
  className,
  required,
  id,
  ...rest
}: InputHTMLAttributes<HTMLTextAreaElement>) => {
  const { state, setState } = useContext(chatContext);
  if (!id) {
    console.error("id is required in input field!");
    return;
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <>
      <textarea
        className={
          "flex h-10 w-full rounded-md border-input border-2 border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 border-0 box-shadow-none" +
          className
        }
        id={id}
        required={required}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            document.getElementById("promptInputButton")?.click?.();
          }
        }}
        {...rest}
        onChange={handleChange}
        style={{ resize: "none", overflowY: "auto" }}
        value={state[id] || ""}
      />
      {/*errors[id] && (
        <p className="text-red-500 text-xs italic">{errors[id]}</p>
      )*/}
    </>
  );
};
