// import axios from "axios";

// export const fetchCsrfToken = async () => {
//   try {
//     const response = await axios.get(
//       "https://note-application-bbc9.onrender.com/api/csrf-token",
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data.csrfToken;
//   } catch (error) {
//     console.error("Failed to fetch CSRF token:", error);
//     return null;
//   }
// };

import axios from "axios";
import Cookies from "js-cookie";

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(
      "https://note-application-bbc9.onrender.com/api/csrf-token",
      { withCredentials: true }
    );
    const csrfToken = response.data.csrfToken;
    Cookies.set("csrfToken", csrfToken, { secure: true, sameSite: "strict" });
    return csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw new Error("Failed to fetch CSRF token");
  }
};
