/*
 * @Author: HideInMatrix
 * @Date: 2024-07-16
 * @LastEditors: HideInMatrix
 * @LastEditTime: 2024-07-18
 * @Description: 这是一则说明
 * @FilePath: /next.js-template/lib/utils.ts
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @Author: HideInMatrix
 * @description: 合并类名
 * @param {array} inputs
 * @return {*}
 * @Date: 2024-07-17
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 判断是否客户端
 * @returns {boolean}
 */
export const isBrowser = typeof window !== "undefined";
