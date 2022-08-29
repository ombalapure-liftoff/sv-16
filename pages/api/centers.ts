import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import globals from "./config";
import Center from "./models/centers";

// Axios responses
type CenterResponse = {
  data: Center[];
};

type ErrorResponse = {
  msg: string;
};

/**
 * Get list of centers
 * @param req
 * @param res
 */
async function getCenters(
  req: NextApiRequest,
  res: NextApiResponse<CenterResponse | ErrorResponse>
) {
  try {
    if (req.method === "GET") {
      const { data, status } = await axios.get<CenterResponse>(
        `${globals.API_URL}/centers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `apikey ${globals.API_KEY}`,
          },
        }
      );

      res.status(status).json(data);
    }
  } catch (error) {
    res.status(200).json({ msg: "Something went wrong..." });
  }
}

export default getCenters;
