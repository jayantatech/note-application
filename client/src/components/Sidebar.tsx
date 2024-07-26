"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchCsrfToken } from "@/utils/csrf";
import Link from "next/link";
const Sidebar = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getCsrfToken = async () => {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
    };

    getCsrfToken();
  }, []);

  const token = Cookies.get("token");
  const user_token = {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-CSRF-Token": csrfToken || "",
    },
    withCredentials: true,
  };

  const logout = async () => {
    try {
      const response = axios.post(
        "http://localhost:4000/api/auth/signout",
        {},
        user_token
      );
      Cookies.remove("token");
      console.log("User signed out successfully");
      router.push("/login");

      return response;
    } catch (error) {
      if (error) throw new Error("something went wrong");
    }
  };

  return (
    <div className="h-screen w-64 max-md:w-40 bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-xl font-bold">Note App</div>
        <nav className="mt-6 mx-2 bg-blue-500 hover:bg-red-500  hover:scale-95 transition-all duration-200 text-white rounded-md font-medium text-[16px]">
          <Link
            href="/"
            className="block py-2.5 px-4 rounded transition duration-200 "
          >
            Notes
          </Link>
        </nav>
      </div>
      <div className="p-4">
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center">
            <div className="ml-3 w-full h-auto">
              <button
                className="text-base text-white font-medium w-full py-2 rounded-md  bg-blue-500 hover:scale-95 transition-all duration-200 hover:bg-red-500"
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
