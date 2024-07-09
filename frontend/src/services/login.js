import axios from "axios";

export const loginUser = async (identifier, password) => {
  try {
    const response = await axios.post(
      "http://localhost:1337/api/auth/local",
      {
        identifier: identifier,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("User logged in:", response.data);
    return response;
  } catch (error) {
    console.error("Error logging in user:", error.response);
    return error.response;
  }
};
