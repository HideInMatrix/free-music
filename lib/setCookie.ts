/*
 * @Author: HideInMatrix
 * @Date: 2024-07-16
 * @LastEditors: HideInMatrix
 * @LastEditTime: 2024-07-18
 * @Description: 这是一则说明
 * @FilePath: /next.js-template/lib/setCookie.ts
 */
"use server";

import { cookies } from "next/headers";

export async function setCookies(name: string, data: any) {
  cookies().set(name, data);
}

export async function getCookies(name: string) {
  return cookies().get(name)?.value;
}
