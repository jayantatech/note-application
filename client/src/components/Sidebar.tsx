"use client";
import { signOutHandler } from "@/app/handler/authHandler";
import { useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const router = useRouter();
  const logout = async () => {
    const response = await signOutHandler();
    router.push("/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-xl font-bold">Note App</div>
        <nav className="mt-10">
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Notes
          </a>
        </nav>
      </div>
      <div className="p-4">
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center">
            <div className="ml-3 w-full h-auto">
              <button
                className="text-base text-white hover:underline w-full py-2 rounded-md  bg-blue-500 hover:scale-95 transition-all duration-200 hover:bg-red-500"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
