import React, { SVGProps } from "react";
import { Input } from "./components/input";
import { Button } from "./components/button";
import { MessageComponent } from "./components/message";

const ChatPage = () => {
  return (
    <div className="w-full max-w-3xl h-full mx-auto flex flex-col gap-4 justify-between">
      <div className="flex-1 overflow-hidden gap-4">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold text-center">Chat with ChatGPT</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Ask me anything!
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <MessageComponent isAvatarBefore={false} message={"Hello"} />
          <MessageComponent
            isAvatarBefore={true}
            message={"Hello, how can i assist you!"}
          />
        </div>
      </div>
      <div className="fixed flex items-center w-[60vw] space-x-2 bottom-5 border-gray-200 dark:border-gray-800">
        <Input id="prompt" required={true} />
        <Button className="inline-flex items-center justify-center border-2 border-gray-300 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 w-10 bg-white">
          <SendIcon />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;

const SendIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
};
