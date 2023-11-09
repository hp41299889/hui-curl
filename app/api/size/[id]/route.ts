import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

import {
  response,
  apiResponse,
  apiErrorHandler,
} from "@/app/_util/server/helper";
import { prisma } from "@/app/_util/server/prisma";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const r = { ...response };
  const { id } = params;
  const payload: Prisma.SizeUpdateInput = await req.json();
  try {
    const updated = await prisma.size.update({
      where: { id: Number(id) },
      data: payload,
    });
    r.statusCode = 201;
    r.response = {
      status: "success",
      message: "update size success",
      data: updated,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const r = { ...response };
  const { id } = params;
  try {
    const deleted = await prisma.size.delete({ where: { id: Number(id) } });
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "delete size success",
      data: deleted,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};
