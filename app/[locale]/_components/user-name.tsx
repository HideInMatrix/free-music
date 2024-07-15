// "use client";
import { getRequest } from "@/lib/customFetch";

// import { useCallback, useEffect } from "react";

export default async function UserName() {
  // 客户端请求方式
  // const loaderProfile = useCallback(async () => {
  //   const result = await getRequest(`/api/auth/profile`);
  //   if (!result.error) {
  //     console.log(result);
  //   }
  // }, []);

  // useEffect(() => {
  //   loaderProfile();
  // }, []);

  // 服务端请求方式
  const result = await getRequest(`/api/auth/profile`);
  if (!result.error) {
    console.log(result);
  }

  const data = result.data as { name: string };

  return <>userName组件 {data.name}</>;
}
