"use client";
import React, { useEffect, useState } from "react";
import UserProfile from "./components/UpdateProfile";
import { User } from "../../interfaces";
import { request } from "../../utils/request";
import { toast } from "react-toastify";
import { USER_IS_LOGGED_OUT } from "@/constants";
import { useRouter } from "next/navigation";

const profilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const res = await request("users/profile", "GET");
        if (res == USER_IS_LOGGED_OUT) {
          router.replace("/login");
          return;
        }
        if (res == null || !res.ok) throw "Something went wrong!";
        setUser(res.json.data);
      } catch (error) {
        console.error(error);
        toast.error("Error while fetching user!");
      }
    })();
  }, []);

  const onUpdateField = (updatedValues: {}) => {
    request("users/update-profile", "POST", updatedValues)
      .then((res) => {
        if (res == USER_IS_LOGGED_OUT) {
          router.replace("/login");
          return;
        }
        if (res == null || !res.ok) {
          toast.error("Something went wrong!");
          return;
        }
        setUser(res.json.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };

  return <UserProfile user={user} onUpdateField={onUpdateField} />;
};

export default profilePage;
