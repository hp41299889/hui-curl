import { Product } from "@prisma/client";

import { nextApi } from "./request";
import { Response } from "../../server/helper";

export const postProduct = async (payload: FormData) => {
  return nextApi.post<Response<Product>>("/product", payload);
};

export const getProduct = async () => {
  return nextApi.get<Response<Product[]>>("/product");
};
