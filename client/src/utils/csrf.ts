import axios from "axios";

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/csrf-token", {
      withCredentials: true,
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
    return null;
  }
};
