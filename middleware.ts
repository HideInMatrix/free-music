import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

// 创建国际化中间件
const intlMiddleware = createMiddleware({
  // 支持的所有语言列表
  locales: ["en", "zh"],

  // 当没有匹配到语言时使用的默认语言
  defaultLocale: "zh",
});

// 自定义中间件，处理 401 错误
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // 检查请求路径，如果是 API 请求则进行处理
  if (url.pathname.startsWith("/api")) {
    const response = NextResponse.next();

    // 如果在 API 请求中捕获到 401 错误
    if (response.status === 401) {
      return NextResponse.redirect("/login"); // 重定向到自定义的401错误页面
    }

    return response;
  }

  // 调用国际化中间件
  return intlMiddleware(req);
}

// 配置中间件应用路径
export const config = {
  // 匹配国际化路径和API路径
  matcher: ["/", "/(zh|en)/:path*", "/api/:path*"],
};
