"use client";

import { Button } from "@/components/ui/button";
import { UndoDot } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleRouter = () => {
    if (pathname !== "/") {
      router.back();
    }
  };
  return (
    <Button
      className="ml-auto"
      variant="ghost"
      size="icon"
      onClick={handleRouter}>
      <UndoDot />
    </Button>
  );
};

export default BackButton;
