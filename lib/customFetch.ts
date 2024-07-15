/*
 * @Author: HideInMatrix
 * @Date: 2024-07-15
 * @LastEditors: HideInMatrix
 * @LastEditTime: 2024-07-15
 * @Description: 请求封装
 * @FilePath: \nextjs-template\lib\customFetch.ts
 */

import useAccessStore from "@/store/useUserAccessStore";
import { redirect } from "next/navigation";
import useSettingStore from "@/store/useSettingStore";
import { isBrowser } from "@/utils";
import { setCookies, getCookies } from "./setCookie";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
const backPreUrl = process.env.BACK_PRE_URL || "http://localhost:3000";

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
    if (isBrowser) {
      token = useAccessStore.getState().token;
      setCookies("token", token);

      defaultLocale = useSettingStore.getState().defaultLocale;
      setCookies("defaultLocale", defaultLocale);
    } else {
      token = (await getCookies("token"))?.value || "";
      defaultLocale = (await getCookies("defaultLocale"))?.value || "";
    }

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

    const response = await fetch(`${backPreUrl}${url}`, config);

    if (response.status === 401) {
      // 处理 401 状态码
      if (isBrowser) {
        location.href = `/${defaultLocale}/login`;
      } else {
        redirect(`/${defaultLocale}/login`);
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
