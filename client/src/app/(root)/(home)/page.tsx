"use client";
import { useEffect, useState } from "react";
import NotesList from "@/components/NotesList";
import Sidebar from "@/components/Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { fetchCsrfToken } from "@/utils/csrf";

const Home = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    // const initializeCsrfToken = async () => {
    //   await fetchCsrfToken();
    // };
    // initializeCsrfToken();
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <NotesList />
      </div>
    </div>
  );
};

export default Home;
