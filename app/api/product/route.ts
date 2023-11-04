import { NextRequest } from "next/server";

import {
  response,
  apiResponse,
  apiErrorHandler,
} from "@/app/_util/server/helper";
import { prisma } from "@/app/_util/server/prisma";
import { Prisma } from "@prisma/client";
import axios from "axios";

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const formData = await req.formData();
  let products: Prisma.ProductCreateInput[] = [];

  for (let i = 0; i < Array.from(formData.entries()).length / 4; i++) {
    const file = formData.get(`product[${i}][file]`);
    if (file && file !== "undefined") {
      const imgData = new FormData();
      imgData.append("upload_preset", process.env.CLOUDINARY_PRESET || "");
      imgData.append("file", file);
      const uploadRes = await axios.post(
        `https://api-ap.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUDNAME}/upload`,
        imgData
      );
      // if (uploadRes.status === 200) {
      //   products.push({
      //     name: String(formData.get(`product[${i}][name]`)),
      //     description: String(formData.get(`product[${i}][description]`)),
      //     price: Number(formData.get(`product[${i}][price]`)),
      //     link: uploadRes.data.secure_url,
      //   });
      // }
      // const created = await prisma.product.createMany({
      //   data: products,
      // });
      r.statusCode = 201;
      r.response = {
        status: "success",
        message: "created many products success",
        data: "created",
      };
    }
  }
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
