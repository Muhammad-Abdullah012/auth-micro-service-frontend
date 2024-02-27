"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout, request } from "../../utils/request";
import { USER_IS_LOGGED_OUT } from "@/constants";
import { toast } from "react-toastify";

export const HeaderComponent = ({
  dropDownComponent,
}: {
  dropDownComponent: React.ReactNode;
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await request("users/profile", "GET");
        if (res == USER_IS_LOGGED_OUT) {
          router.replace("/login");
          return;
        }
        if (res == null || !res.ok) throw "Something went wrong!";

        setImageUrl(res.json.data?.profileImage);
      } catch (error) {
        console.error(error);
        toast.error("Error while fetching user!");
      }
    })();
  }, [router]);

  return (
    <>
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
      >
        <div
          className={`w-8 h-8 rounded-full md:mr-2 ${
            imageUrl ? "bg-cover bg-center" : "bg-blue-300"
          }`}
          style={
            imageUrl
              ? {
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/files/images/${imageUrl})`,
                }
              : {}
          }
        >
          <span className="sr-only">Toggle user menu</span>
        </div>
      </button>
      {isDropdownOpen && dropDownComponent}
    </>
  );
};

export const SignoutBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        logout().then((v) => {
          if (!v || !v.ok) return;
          router.replace("/login");
        });
      }}
      className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
      role="menuitem"
      tabIndex={-1}
      id="menu-item-3"
    >
      Sign out
    </button>
  );
};
