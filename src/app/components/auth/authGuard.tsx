"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { REFRESH_TOKEN, USER_IS_LOGGED_OUT } from "../../constants";
import { refreshTokens } from "../../../utils/request";
import { LoadingSpinner } from "../ui/loadingSpinner";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      router.replace("/login");
    } else {
      (async () => {
        const res = await refreshTokens();
        if (!res || res === USER_IS_LOGGED_OUT || !res.ok) {
          router.replace("/login");
        } else {
          setIsAuthenticated(true);
        }
      })();
    }
  }, []);
  if (isAuthenticated) return <>{children}</>;
  else return <LoadingSpinner />;
};
