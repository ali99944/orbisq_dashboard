'use client'

import axios from "axios";
import { api_url } from "../constants/app_constants";

export const useAxios = (
  contentType?: "aplication/json" | "multipart/form-data"
) => {

  let token
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token")
  }

  return axios.create({
    baseURL: api_url,
    headers: {
      "Content-Type": contentType as string,
      accept: "application/json",
      authorization: token,
      "Access-Control-Allow-Origin": "*",
    },
  });
};
