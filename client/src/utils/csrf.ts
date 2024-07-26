import axios from "axios";

export const fetchCsrfToken = async (): Promise<string> => {
  try {
    const response = await axios.get(
      "https://note-application-bbc9.onrender.com/api/csrf-token",
      {
        withCredentials: true,
      }
    );
    return response.data.csrfToken;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
    throw error;
  }
};
