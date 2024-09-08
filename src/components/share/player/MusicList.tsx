import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import MusicCurrentList from "./MusicCurrentList";
// import MusicHistoryList from "./MusicHistoryList";
type Props = {
  children: ReactNode;
};

const MusicList = ({ children }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="h-full flex flex-col">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Tabs
          defaultValue="current"
          className="m-2 flex-auto flex flex-col h-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">当前歌单</TabsTrigger>
            {/* <TabsTrigger value="history">历史歌单</TabsTrigger> */}
          </TabsList>
          <TabsContent
            value="current"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 border-white flex-auto h-0">
            <MusicCurrentList />
          </TabsContent>
          {/* <TabsContent value="history">
            <MusicHistoryList />
          </TabsContent> */}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default MusicList;
