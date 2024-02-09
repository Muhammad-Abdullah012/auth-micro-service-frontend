"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../../utils/request";

export const HeaderComponent = ({
  imageUrl,
  dropDownComponent,
}: {
  imageUrl: string;
  dropDownComponent: React.ReactNode;
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
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
