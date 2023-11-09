import { Category, Color, Prisma, Product, Size } from "@prisma/client";

import { nextApi } from "./request";
import { Response } from "../../server/helper";

export const postProduct = async (payload: FormData) => {
  return nextApi.post<Response<Product>>("/product", payload);
};

export const getProduct = async () => {
  return nextApi.get<Response<Product[]>>("/product");
};

// category
export const postCategory = async (payload: Prisma.CategoryCreateInput) => {
  return nextApi.post<Response<Category>>("/category", payload);
};

export const getCategory = async () => {
  return nextApi.get<Response<Category[]>>("/category");
};

export const patchCategory = async (
  id: number,
  payload: Prisma.CategoryUpdateInput
) => {
  return nextApi.patch<Response<Category>>(`/category/${id}`, payload);
};

export const deleteCategory = async (id: number) => {
  return nextApi.delete<Response<Category>>(`/category/${id}`);
};

// color
export const postColor = async (payload: Prisma.ColorCreateInput) => {
  return nextApi.post<Response<Color>>("/color", payload);
};

export const getColor = async () => {
  return nextApi.get<Response<Color[]>>("/color");
};

export const patchColor = async (
  id: number,
  payload: Prisma.CategoryUpdateInput
) => {
  return nextApi.patch<Response<Color>>(`/color/${id}`, payload);
};

export const deleteColor = async (id: number) => {
  return nextApi.delete<Response<Color>>(`/color/${id}`);
};

// size
export const postSize = async (payload: Prisma.CategoryCreateInput) => {
  return nextApi.post<Response<Size>>("/size", payload);
};

export const getSize = async () => {
  return nextApi.get<Response<Size[]>>("/size");
};

export const patchSize = async (
  id: number,
  payload: Prisma.CategoryUpdateInput
) => {
  return nextApi.patch<Response<Size>>(`/size/${id}`, payload);
};

export const deleteSize = async (id: number) => {
  return nextApi.delete<Response<Size>>(`/size/${id}`);
};
