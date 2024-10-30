import axios from "axios";

const baseURL = "https://api.coinlore.net/api/tickers/";
export const fetchCoinsData = async (start = 0, limit = 10) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        start,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return null;
  }
};
