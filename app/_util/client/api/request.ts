import axios, { AxiosInstance } from "axios";

const request = (baseURL = ""): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });
  return instance;
};

export const nextApi = request(`${process.env.NEXT_PUBLIC_API_URL}/api`);
