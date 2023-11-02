import { NextRequest } from "next/server";

import {
  apiErrorHandler,
  apiResponse,
  response,
} from "@/app/_util/server/helper";

interface PostAuth {
  username: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: PostAuth = await req.json();
  try {
    const authentication = auth(payload);
    if (authentication) {
      r.statusCode = 200;
      r.response = {
        status: "success",
        message: "login success",
        data: "login success",
      };
    } else {
      r.statusCode = 403;
      r.response = {
        status: "failed",
        message: "login failed",
        data: "login failed",
      };
    }
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};

const auth = (u: PostAuth): Boolean => {
  return (
    u.username === process.env.BACKEND_USERNAME &&
    u.password === process.env.BACKEND_PASSWORD
  );
};
