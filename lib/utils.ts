/*
 * @Author: HideInMatrix
 * @Date: 2024-07-16
 * @LastEditors: HideInMatrix
 * @LastEditTime: 2024-07-28
 * @Description: 这是一则说明
 * @FilePath: /free-music/lib/utils.ts
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

/**
 * @Author: HideInMatrix
 * @description: 节流函数
 * @param {Function} fn
 * @param {number} wait
 * @return {*}
 * @Date: 2024-07-28
 */
export const throttle = (fn: Function, wait: number) => {
  let timer: NodeJS.Timeout | undefined;
  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = undefined;
      }, wait);
    }
  };
};

/**
 * @Author: HideInMatrix
 * @description: 防抖
 * @param {Function} fn
 * @param {number} wait
 * @return {*}
 * @Date: 2024-07-28
 */
export const debounce = (fn: Function, wait: number) => {
  let timer: NodeJS.Timeout | undefined;

  return (...args: any) => {
    timer = undefined;
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};
