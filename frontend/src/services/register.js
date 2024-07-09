import axios from "axios";

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      {
        username: username,
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("User registered:", response.data);
    return response;
  } catch (error) {
    console.error("Error registering user:", error.response);
    return error.response;
  }
};
