import React, { SVGProps } from "react";

const ChatPage = () => {
  return (
    <div className="w-full max-w-3xl mx-auto grid gap-4 p-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Chat with ChatGPT</h1>
        <p className="text-gray-500 dark:text-gray-400">Ask me anything!</p>
      </div>
      <div className="grid gap-4">
        <div className="flex items-start space-x-2">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              😎
            </span>
          </span>
          <div className="bg-gray-100 rounded-lg dark:bg-gray-800 p-4">
            <p className="text-sm">Hi there! How can I assist you today?</p>
          </div>
        </div>
        <div className="flex justify-end items-start space-x-2">
          <div className="bg-gray-100 rounded-lg dark:bg-gray-800 p-4">
            <p className="text-sm">
              I'd like to learn more about your features.
            </p>
          </div>
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              😎
            </span>
          </span>
        </div>
        <div className="flex items-start space-x-2">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              😎
            </span>
          </span>
          <div className="bg-gray-100 rounded-lg dark:bg-gray-800 p-4">
            <p className="text-sm">
              Our platform provides seamless deployment and collaboration for
              your projects. You can easily deploy websites, APIs, and
              serverless functions.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
        <div className="flex items-center space-x-2">
          <input
            className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 border-0 box-shadow-none"
            id="message"
            placeholder="Type a message..."
          />
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10">
            <SendIcon />
            <span className="sr-only">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

function SendIcon(props: SVGProps<SVGSVGElement>) {
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
}
