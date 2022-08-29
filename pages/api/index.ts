import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import Center from "../../types/Center";
import globals from "./config";

// Axios response
type CenterResponse = {
  data: Center[];
};

// Get centers
async function getCenters(
  req: NextApiRequest,
  res: NextApiResponse<CenterResponse>
) {
  try {
    console.log("Hello...");
    if (req.method === "GET") {
      const { data, status } = await axios.get<CenterResponse>(
        `${globals.API_URL}/centers`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: globals.API_KEY,
          },
        }
      );

      console.log("Centers:", data);
      return res.status(405).send(data);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

export default getCenters;
