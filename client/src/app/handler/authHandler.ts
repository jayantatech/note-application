import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const token = Cookies.get("token");
// const router = useRouter();
console.log("handler token", token);
const user_token = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export async function signOutHandler() {
  const response = axios.post(
    "http://localhost:4000/api/auth/signout",
    {},
    user_token
  );
  Cookies.remove("token");
  console.log("User signed out successfully");

  return response;
}

export async function getNotes() {
  try {
    const response = axios.get("http://localhost:4000/api/notes", user_token);
    // console.log("The respone data is hear", (await response).data);
    return (await response).data;
  } catch (error) {
    if (error) throw error;
  }
}
