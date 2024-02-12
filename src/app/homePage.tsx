"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { REFRESH_TOKEN, USER_IS_LOGGED_OUT } from "./constants";
import { refreshTokens } from "../utils/request";

export const HomePage = () => {
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
          toast.success("Successfully logged in!");
          router.replace("/chat");
        }
      })();
    }
  }, []);
  return <></>;
};
