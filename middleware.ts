import type { NextRequest } from "next/server";

// 自定义中间件，处理 401 错误
export function middleware(req: NextRequest) {}

// 配置中间件应用路径
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
