import Image from "next/image";
import Link from "next/link";
import Favicon from "@/app/favicon.ico";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlignJustify, ChevronRight, Search } from "lucide-react";
import "./over-drawer.css";

import { Separator } from "@/components/ui/separator";

import {
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  Drawer,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SearchWrapper } from "../SearchWrapperDialog";

interface Menu {
  label: string;
  key: string;
  children?: Menu[];
}

export default function Header() {
  const menus: Menu[] = [];

  return (
    <header className="flex translate-y-0 transition-all duration-700 justify-between w-full bg-white fixed h-12 z-20 max-w-[1920px] items-center border-b">
      <div className="flex gap-3 h-full pl-10 justify-between items-center lg:justify-start lg:pl-52">
        <Link href="/" className="flex cursor-pointer items-center">
          <Image
            src={Favicon}
            alt="网站图标"
            width={28}
            height={28}
            unoptimized
            className="cursor-pointer w-7 h-7 aspect-square"
          />
          <div className="ml-2 min-w-max">免费音乐</div>
        </Link>

        {/* <NavigationMenu className="ml-16 hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  首页
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {menus.map((menu) => (
              <NavigationMenuItem key={menu.key}>
                <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {menu.children?.map((child) => (
                      <ListItemGroup item={child} key={child.key} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu> */}
      </div>
      <SearchWrapper
        trigger={
          <Button variant="ghost" size="icon" className="lg:mr-4 ml-auto">
            <Search />
          </Button>
        }></SearchWrapper>
      {/* <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <AlignJustify />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full overflow-y-auto rounded-none border-0">
          <div className="h-full overflow-y-auto bg-white p-4">
            {menus.map((menu) => (
              <>
                <SubDrawer menu={menu} key={menu.key} />
              </>
            ))}
          </div>
        </DrawerContent>
      </Drawer> */}
    </header>
  );
}

interface Menu {
  label: string;
  key: string;
  children?: Menu[];
}

const SubDrawer = ({ menu }: { menu: Menu }) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger className="block w-full">
        {menu.children ? (
          <>
            <p className="text-lg font-medium leading-none my-4 flex items-center justify-between">
              {menu.label}
              <ChevronRight></ChevronRight>
            </p>
            <Separator />
          </>
        ) : (
          <></>
        )}
      </DrawerTrigger>
      <DrawerContent className="h-full overflow-y-auto rounded-none border-0">
        <DrawerTitle className="hidden"></DrawerTitle>
        <DrawerDescription className="hidden"></DrawerDescription>
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>

        <div
          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          key={menu.key}>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            {menu.children ? (
              menu.children.map((child) => (
                <ListItemGroup item={child} key={child.key} />
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const ListItemGroup = ({ item }: { item: Menu }) => (
  <ListItem
    className="pt-2"
    title={item.label}
    type={item.children ? false : true}>
    {item.children ? (
      item.children.map((gc) => <ListItem title={gc.label} key={gc.key} />)
    ) : (
      <></>
    )}
  </ListItem>
);

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
