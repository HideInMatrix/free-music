"use client";

import { useState } from "react";
import useAccessStore from "@/store/useUserAccessStore";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/customFetch";
import { setCookies } from "@/lib/setCookie";

export function CreateForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAccessStore();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // 阻止默认表单提交行为

    const formData = new FormData(e.target);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 这里可以调用你的登录 API
    if (email && password) {
      const res = (await postRequest("/auth/login", {
        email,
        password,
      })) as any;
      // 关键信息一份存本地一份存线上
      await setCookies("NEXT_TOKEN", res.data.token);
      setToken(res.data.token);
      router.push(`/`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
