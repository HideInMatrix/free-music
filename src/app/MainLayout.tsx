
import HeaderBarWrapper from "@/components/share/HeaderBar";
import { cn } from "@/lib/utils";
import Player from "@/components/share/player/Player";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

export default function LocaleLayout() {
  return (
    <>
      <div className={cn("h-dvh bg-background font-sans antialiased")}>
        <HeaderBarWrapper>
          <Outlet />
          <Toaster />
          <Player />
        </HeaderBarWrapper>
      </div>
    </>
  );
}
