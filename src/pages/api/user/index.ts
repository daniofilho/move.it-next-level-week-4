import { NowRequest, NowResponse } from "@vercel/node";

import Cors from "cors";

import middleware from "../../../../middleware";

import dbConnect from "../../../../server/utils/dbConnect";

import User from "../../../../server/models/user";

// Initialize the cors middleware
const cors = middleware(
  Cors({
    origin: "*",
    methods: ["PUT"],
  })
);

dbConnect();

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  await cors(req, res);

  const { login, experience, level, challengesCompleted } = req.body;

  try {
    let user = await User.findOne({ login });

    if (!user) {
      user = await User.create(req.body);
    } else {
      user = await User.updateOne(
        { login },
        {
          experience,
          level,
          challengesCompleted,
        }
      );
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false });
  }

  return res;
};
