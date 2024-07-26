import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

const user_token = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export async function signOutHandler() {
  const response = axios.post(
    "https://note-application-bbc9.onrender.com/api/auth/signout",
    {},
    user_token
  );
  Cookies.remove("token");
  console.log("User signed out successfully");

  return response;
}

export async function getNotes() {
  try {
    const response = axios.get(
      "https://note-application-bbc9.onrender.com/api/notes",
      user_token
    );
    return (await response).data;
  } catch (error) {
    if (error) throw error;
  }
}
