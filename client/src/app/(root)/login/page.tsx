"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchCsrfToken } from "@/utils/csrf";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const getCsrfToken = async () => {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
    };

    getCsrfToken();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "https://note-application-bbc9.onrender.com/api/auth/login",
        { email, password },
        {
          headers: {
            "X-CSRF-Token": csrfToken || "",
          },
          withCredentials: true,
        }
      );

      const { token } = response.data;
      Cookies.set("token", token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      router.push("/");
    } catch (error: any) {
      setError("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="hidden">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                autoComplete="current-email"
              />
            </div>
            <div>
              <label htmlFor="password" className="hidden">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => router.push("/sign-up")}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
