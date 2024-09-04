
import HeaderBarWrapper from "@/components/share/HeaderBar";
import { cn } from "@/lib/utils";
import Player from "@/components/share/player/Player";
import { Outlet } from "react-router-dom";

export default function LocaleLayout() {
  return (
    <>
      <div className={cn("h-dvh bg-background font-sans antialiased")}>
        <HeaderBarWrapper>
          <Outlet />
          <Player />
        </HeaderBarWrapper>
      </div>
    </>
  );
}
