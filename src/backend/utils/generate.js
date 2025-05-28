import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.BACKEND_URL;

export const generateToken = async (storedRefreshToken) => {
  try {
    const response = await axios.post(`${url}/api/refresh-token`, {
      refreshToken: storedRefreshToken,
    });

    const newAccessToken = response.data.accessToken;
    return newAccessToken;
  } catch (error) {
    console.error("Access token yenilenemedi:", error.response?.data || error.message);
    return null; // veya hata fırlatmak istersen throw error;
  }
};
