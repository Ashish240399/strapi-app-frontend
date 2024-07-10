import axios from "axios";

export const getMessagesForUser = async (senderId, jwt) => {
  try {
    const response = await axios.get(
      `https://stable-apparel-284362d0ca.strapiapp.com/api/chat_messages/sender`,
      {
        params: {
          senderId: senderId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    console.log("Fetched messages:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return error.response;
  }
};
