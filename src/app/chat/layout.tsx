import { Header } from "@/components/ui/header";
import React from "react";
import { ChatContextProvider } from "./chatContext";
const chatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Header />
      <ChatContextProvider>{children}</ChatContextProvider>
    </main>
  );
};

export default chatLayout;
