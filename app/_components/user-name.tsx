"use client";
import { getRequest } from "@/lib/customFetch";

import { useCallback, useEffect, useState } from "react";

// export default async function UserName() {

// 服务端请求方式
//   const result = await getRequest(`/auth/profile`);
// if (!result.error) {
//   console.log(result);
// }

//   const data = result.data as { name: string };

//   return <>userName组件 {data?.name || "为获取到数据"}</>;
// }

export default function UserName() {
  // 客户端请求方式
  const [data, setData] = useState<{
    data?: any;
    error?: string;
    status?: number;
  }>();
  const loaderProfile = useCallback(async () => {
    const result = await getRequest(`/auth/profile`);
    if (!result.error) {
      setData(result);
    }
  }, []);

  useEffect(() => {
    loaderProfile();
  }, [loaderProfile]);

  return <>userName组件 {data?.data.name}</>;
}
