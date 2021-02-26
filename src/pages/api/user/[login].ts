import { NowRequest, NowResponse } from "@vercel/node";

import Cors from "cors";

import middleware from "../../../../middleware";

import dbConnect from "../../../../server/utils/dbConnect";

import User from "../../../../server/models/user";

// Initialize the cors middleware
const cors = middleware(
  Cors({
    origin: "*",
    methods: ["GET"],
  })
);

dbConnect();

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  await cors(req, res);

  try {
    const user = await User.findOne({ login: req.query.login });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  return res;
};
