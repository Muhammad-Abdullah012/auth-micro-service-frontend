import Link from "next/link";
import React, { SVGAttributes } from "react";
import { HeaderComponent, SignoutBtn } from "../headerComponents";

export const Header = () => {
  return (
    <header className="sticky top-0 bg-gray-800 p-4 flex flex-col md:flex-row justify-between items-center z-50">
      <div className="text-white font-bold text-xl mb-4 md:mb-0">Chat GPT</div>

      <div className="relative inline-block text-left">
        <HeaderComponent
          imageUrl=""
          dropDownComponent={
            <div className="flex justify-center">
              <div
                className="absolute md:right-0 z-10 mt-2 max-w-xs sm:w-48 md:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <Link
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    Profile
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                  >
                    Edit Profile
                  </Link>
                  <SignoutBtn />
                </div>
              </div>
            </div>
          }
        />
      </div>
    </header>
  );
};

export const UserIcon = (props: SVGAttributes<SVGSVGElement>) => {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};
