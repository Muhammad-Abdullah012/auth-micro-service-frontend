"use client";

import { BEARER_TOKEN, REFRESH_TOKEN } from "@/constants";

export const request = async (url: string, method: string, data?: any) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const bearer = localStorage.getItem(BEARER_TOKEN);
  if (bearer) {
    headers.bearer = `Bearer ${bearer}`;
  }
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const json = await res.json();
      console.log("res => ", res);
      return { ok: res.ok, json };
    })
    .catch((err) => console.error("Error attempting request => ", err));
};

export const refreshTokens = () => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const refresh = localStorage.getItem(REFRESH_TOKEN);
};
