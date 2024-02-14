import React from "react";

export const MessageComponent = ({
  isAvatarBefore,
  message,
}: {
  isAvatarBefore: boolean;
  message: string;
}) => {
  return (
    <div
      className={`flex items-start space-x-2 ${
        !isAvatarBefore ? "justify-end" : ""
      }`}
    >
      {isAvatarBefore && (
        <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
            🤖
          </span>
        </span>
      )}

      <div className="bg-gray-100 rounded-lg dark:bg-gray-800 p-4">
        <p className="text-sm">{message}</p>
      </div>

      {!isAvatarBefore && (
        <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
            😎
          </span>
        </span>
      )}
    </div>
  );
};
