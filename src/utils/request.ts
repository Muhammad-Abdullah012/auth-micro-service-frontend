"use client";

import { BEARER_TOKEN, REFRESH_TOKEN, USER_IS_LOGGED_OUT } from "@/constants";

export const request = async (url: string, method: string, data?: any) => {
  // await validateToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const bearer = localStorage.getItem(BEARER_TOKEN);
  if (bearer) {
    headers["Authorization"] = `Bearer ${bearer}`;
  }
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const json = await res.json();
      if (res.statusText === "Unauthorized") {
        const refreshed = await refreshTokens();
        if (refreshed === USER_IS_LOGGED_OUT) return USER_IS_LOGGED_OUT;
        if (refreshed?.ok) {
          request(url, method, data);
        } else {
          return USER_IS_LOGGED_OUT;
        }
      }
      return { ok: res.ok, json };
    })
    .catch((err) => console.error("Error attempting request => ", err));
};

export const validateToken = async () => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const bearer = localStorage.getItem(BEARER_TOKEN);
  if (bearer) {
    headers["Authorization"] = `Bearer ${bearer}`;
  }
  const validate = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/token/validate`,
    {
      headers,
      method: "POST",
    }
  );
  const json = await validate.json();
  if (!validate.ok) {
    return await refreshTokens();
  }
  return { ok: validate.ok, json };
};

export const refreshTokens = () => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const refresh = localStorage.getItem(REFRESH_TOKEN);
  if (!refresh) return USER_IS_LOGGED_OUT;
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/token/refresh`, {
    headers,
    method: "POST",
    body: JSON.stringify({ refreshToken: refresh }),
  }).then(async (res) => {
    const json = await res.json();
    if (res.ok) {
      const { bearer, refresh } = json?.data ?? {};
      localStorage.setItem(BEARER_TOKEN, bearer?.token ?? "");
      localStorage.setItem(REFRESH_TOKEN, refresh?.token ?? "");
    } else {
      localStorage.removeItem(BEARER_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    }
    return { ok: res.ok, json };
  });
};

export const logout = async () => {
  const logout = await request("logout", "POST");
  if (!logout || logout === USER_IS_LOGGED_OUT) return;
  if (logout.ok) {
    localStorage.removeItem(BEARER_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }
  return { ok: logout.ok, json: logout.json };
};
