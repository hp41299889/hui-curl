import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

import {
  response,
  apiResponse,
  apiErrorHandler,
} from "@/app/_util/server/helper";
import { prisma } from "@/app/_util/server/prisma";

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: Prisma.ColorCreateInput = await req.json();
  try {
    const created = await prisma.color.create({ data: payload });
    r.statusCode = 201;
    r.response = {
      status: "success",
      message: "create color success",
      data: created,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};

export const GET = async () => {
  const r = { ...response };
  try {
    const readed = await prisma.color.findMany();
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "read color success",
      data: readed,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};
