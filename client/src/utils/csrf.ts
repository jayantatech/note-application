import axios from "axios";
import Cookies from "js-cookie";

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(
      "https://note-application-bbc9.onrender.com/api/csrf-token",
      {
        withCredentials: true,
      }
    );
    Cookies.set("__Host-csrf-token", response.data.csrfToken, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
    return null;
  }
};
