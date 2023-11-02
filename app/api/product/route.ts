import { NextRequest } from "next/server";

import {
  response,
  apiResponse,
  apiErrorHandler,
} from "@/app/_util/server/helper";
import { prisma } from "@/app/_util/server/prisma";
import { Prisma } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const f = await req.formData();
  console.log(f);

  // const payload: Prisma.ProductCreateInput = await req.json();
  // try {
  //   const result = await prisma.product.create({
  //     data: payload,
  //   });
  //   r.statusCode = 201;
  //   r.response = {
  //     status: "success",
  //     message: "create product success",
  //     data: result,
  //   };
  // } catch (err) {
  //   return apiErrorHandler(err, r);
  // }
  return apiResponse(r);
};

export const GET = async () => {
  const r = { ...response };
  try {
    const result = await prisma.product.findMany();
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "read product success",
      data: result,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};
