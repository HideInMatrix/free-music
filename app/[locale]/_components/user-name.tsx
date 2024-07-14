"use client";

import { GetProfile } from "@/apis/userInfo";
import { useCallback, useEffect } from "react";

export default function UserName() {
  const loaderProfile = useCallback(async () => {
    const result = await GetProfile();
    console.log(result);
  }, []);

  useEffect(() => {
    loaderProfile();
  }, []);

  return <>userName组件</>;
}
