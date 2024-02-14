import { Header } from "@/components/ui/header";
import React from "react";
import { ChatContextProvider } from "./chatContext";
import { AuthGuard } from "@/components/auth/authGuard";
const chatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <ChatContextProvider>
        <AuthGuard>
          <Header />
          {children}
        </AuthGuard>
      </ChatContextProvider>
    </main>
  );
};

export default chatLayout;
