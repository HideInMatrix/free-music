import { Link } from "react-router-dom";
import Favicon from "/icons/favicon.ico";
import { ReactNode, Suspense } from "react";
import { cn } from "@/lib/utils";

import "./over-drawer.css";

import { SearchCommand } from "../SearchCommand";
import SearchKeyword from "./SearchKeyword";
import BackButton from "./BackButton";

export default function Header() {
  return (
    <header className="flex translate-y-0 transition-all duration-700 justify-between w-full bg-white fixed h-12 z-20 items-center border-b">
      <div className="flex gap-3 h-full pl-10 justify-between items-center lg:justify-start lg:pl-52">
        <Link to="/" className="flex cursor-pointer items-center">
          <img
            src={Favicon}
            alt="网站图标"
            width={28}
            height={28}
            loading="lazy"
            className="cursor-pointer w-7 h-7 aspect-square"
          />
          <div className="ml-2 min-w-max">音乐地带</div>
        </Link>
      </div>
      <Suspense>
        <BackButton />
      </Suspense>
      <Suspense fallback={<div>loading</div>}>
        <SearchKeyword></SearchKeyword>
      </Suspense>
      <SearchCommand></SearchCommand>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  type,
}: {
  className?: string;
  title: string;
  children?: ReactNode;
  type?: boolean;
}) => (
  <div
    className={cn(
      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
      className,
      {
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground":
          type,
      }
    )}>
    <div className="text-sm font-medium leading-none">{title}</div>
    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
      {children}
    </div>
  </div>
);

ListItem.displayName = "ListItem";
