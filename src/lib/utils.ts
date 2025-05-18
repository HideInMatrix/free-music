/*
 * @Author: HideInMatrix
 * @Date: 2024-07-16
 * @LastEditors: HideInMatrix
 * @LastEditTime: 2024-09-18
 * @Description: 这是一则说明
 * @FilePath: /free-music-react/src/lib/utils.ts
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
 * @description: 判断当前环境是PC还是移动端
 * @return {boolean} true为移动端，false为PC端
 * @Date: 2024-09-18
 */
export const isMobile = (): boolean => {
  if (!isBrowser) return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    "android",
    "iphone",
    "ipod",
    "ipad",
    "windows phone",
    "blackberry",
    "opera mini",
    "mobile",
    "mobi"
  ];
  
  return mobileKeywords.some(keyword => userAgent.includes(keyword));
};

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
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};

/**
 * @Author: HideInMatrix
 * @description: 转换秒数成分钟
 * @seconds {number}
 * @return {*}
 * @Date: 2024-07-28
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

/**
 * @Author: HideInMatrix
 * @description: 获取枚举类 指定值的下一个值
 * @return {*}
 * @Date: 2024-09-08
 */
export const getNextEnumValue = <T extends Record<string, string>>(
  enumObj: T,
  currentValue: T[keyof T]
): T[keyof T] => {
  const values = Object.values(enumObj) as T[keyof T][];
  const currentIndex = values.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % values.length;
  return values[nextIndex];
};

// 检测容器是否需要滚动，若不需要则加载更多数据
export const checkAndLoadMore = ({
  containerRef,
  setPage,
  toEnd,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  toEnd: boolean;
}) => {
  const container = containerRef.current;
  if (
    container &&
    container.children[0] &&
    container.children[0].clientHeight <= container.clientHeight &&
    !toEnd
  ) {
    // 如果内容高度不足以滚动，且还有数据未加载，则主动触发加载
    setPage((prevPage) => prevPage + 1);
  }
};
