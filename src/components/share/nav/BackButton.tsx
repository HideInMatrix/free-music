"use client";

import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import { startTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleRouter = () => {
    if (pathname !== "/") {
      startTransition(() => {
        navigate(-1);
      });
    }
  };
  return (
    <Button
      className="ml-auto"
      variant="ghost"
      size="icon"
      onClick={handleRouter}>
      <CircleArrowLeft />
    </Button>
  );
};

export default BackButton;
