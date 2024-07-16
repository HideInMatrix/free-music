"use server";

import { cookies } from "next/headers";

export async function setCookies(name: string, data: any) {
  cookies().set(name, data);
}

export async function getCookies(name: string) {
  return cookies().get(name)?.value;
}
