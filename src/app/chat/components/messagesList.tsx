"use client";
import { useContext } from "react";
import { MessageComponent } from "./message";
import { chatContext } from "../chatContext";
import { ROLE } from "../../../interfaces";

export const MessagesList = () => {
  const { state } = useContext(chatContext);

  return (
    <div className="flex flex-col gap-4 pb-20">
      {state?.messages ? (
        state?.messages?.map(
          (m: { role: ROLE; message: string }, idx: string) => {
            return (
              <MessageComponent
                isAvatarBefore={m.role === ROLE.RESPONSE}
                message={m.message ?? ""}
                key={idx}
              />
            );
          }
        )
      ) : (
        <>
          <MessageComponent isAvatarBefore={false} message={"Hello"} />
          <MessageComponent
            isAvatarBefore={true}
            message={"Hello, how can i assist you!"}
          />
        </>
      )}
    </div>
  );
};
