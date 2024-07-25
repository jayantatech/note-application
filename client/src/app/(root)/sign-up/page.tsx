"use client";
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, useState } from "react";
import { setEmitFlags } from "typescript";
// import { signup } from "./actions";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError("Enter your info");
      return null;
    }

    try {
      const data = axios.post("http://localhost:4000/api/auth/signup", {
        name,
        email,
        password,
        role: "user",
      });
      setName("");
      setEmail("");
      setPassword("");
      return data;
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError("Registration failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create a new account
        </h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="hidden">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="hidden">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-t-none"
                placeholder="Email address"
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
                value={password}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className=" items-center justify-between hidden">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              // type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(event) => handleSignUp(event)}
            >
              Sign Up
            </button>
          </div>
          <div>
            <p className="mt-2 text-center text-sm text-gray-600">
              I have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
