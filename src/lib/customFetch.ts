/*
 * @Author: HideInMatrix
 * @Date: 2024-07-15
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @LastEditTime: 2024-09-01
 * @Description: 请求封装
 * @FilePath: /free-music-react/src/lib/customFetch.ts
 */
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ApiResponse {
  data?: unknown;
  error?: string;
  status?: number;
  success?: boolean;
}

const apiClient = (method: HttpMethod) => {
  return async (
    url: string,
    data?: unknown,
    options: FetchOptions = {}
  ): Promise<ApiResponse> => {
    const config: FetchOptions = {
      method,
      ...options,
    };

    if (method !== "GET" && data) {
      config.body = JSON.stringify(data);
    } else if (method === "GET" && data) {
      const _params = [];
      for (const [key, value] of Object.entries(data)) {
        _params.push(`${key}=${value}`);
      }
      url += `?${_params.join("&")}`;
    }

    const response = await fetch(`${url}`, config);

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
