/*
 * @Author: HideInMatrix
 * @Date: 2024-07-15
 * @LastEditors: HideInMatrix
 * @LastEditTime: 2024-07-17
 * @Description: 请求封装
 * @FilePath: /next.js-template/lib/customFetch.ts
 */

import { redirect } from "next/navigation";
import { isBrowser } from "@/lib/utils";
import { getCookies } from "./setCookie";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
const backPreUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BACK_PRE_URL;
const urlPreTag =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BACK_PRE_TAG
    : "";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status?: number;
}

const apiClient = <T>(method: HttpMethod) => {
  return async (
    url: string,
    data?: any,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> => {
    const controller = new AbortController();
    const { signal } = controller;
    let token = "";
    let defaultLocale = "";
    token = (await getCookies("NEXT_TOKEN")) || "";
    defaultLocale = (await getCookies("NEXT_LOCAL")) || "";

    const config: FetchOptions = {
      method,
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    };

    if (method !== "GET" && data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${backPreUrl}${urlPreTag}${url}`, config);

    if (response.status === 401) {
      // 处理 401 状态码
      if (isBrowser) {
        location.href = `/login`;
      } else {
        redirect(`/login`);
      }
    }

    const result = await response.json();

    if (!response.ok) {
      return {
        error: result.message || "Request failed",
        status: response.status,
      };
    }

    return result;
  };
};

export const getRequest = apiClient("GET");
export const postRequest = apiClient("POST");
export const putRequest = apiClient("PUT");
export const deleteRequest = apiClient("DELETE");
