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
import { isMobile } from '@/lib/utils';

// import MusicHistoryList from "./MusicHistoryList";
// MusicList 组件，用于展示音乐列表及相关内容
type Props = {
  children: ReactNode;
};

// MusicList 组件，接受 children 作为属性
const MusicList = ({ children }: Props) => {
  const deviceType = isMobile() ? 'mobile' : 'pc';
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={deviceType === 'mobile'? 'bottom':'right'} className="h-full flex flex-col">
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
