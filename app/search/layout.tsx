"use client";
import { ReactNode, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type SearchProps = {
  children: ReactNode;
  albums: ReactNode;
  artists: ReactNode;
  playlists: ReactNode;
  songs: ReactNode;
};

export default function SearchLayout({
  children,
  albums,
  artists,
  playlists,
  songs,
}: SearchProps) {
  const triggers = [
    { name: "歌曲", value: "songs" },
    { name: "专辑", value: "albums" },
    { name: "艺术家", value: "artists" },
    { name: "播放列表", value: "playlists" },
  ];
  const searchParams = useSearchParams();
  const [pageType, setPageType] = useState("");
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    let _pageType = searchParams.get("type");
    if (_pageType) {
      setPageType(_pageType);
    }
    let _value = searchParams.get("keyword");
    if (_value) {
      setKeyword(_value);
    }
  }, [searchParams.get("type")]);

  const router = useRouter();
  const handleValueChange = (value: string) => {
    setPageType(value);
    router.push(
      `/search?keyword=${searchParams.get("keyword") || ""}&type=${value}`
    );
  };

  return (
    <div className="flex-auto h-full flex flex-col overflow-hidden">
      <Tabs
        value={pageType}
        className="m-2 flex-auto flex flex-col overflow-hidden"
        onValueChange={handleValueChange}>
        <TabsList className="grid w-full grid-cols-4">
          {triggers.map((trigger) => (
            <TabsTrigger value={trigger.value} key={trigger.value}>
              {trigger.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent className="flex-auto overflow-hidden" value="songs">
          {songs}
        </TabsContent>
        <TabsContent className="flex-auto overflow-auto" value="albums">
          {albums}
        </TabsContent>
        <TabsContent className="flex-auto overflow-auto" value="artists">
          {artists}
        </TabsContent>
        <TabsContent className="flex-auto overflow-auto" value="playlists">
          {playlists}
        </TabsContent>
      </Tabs>
    </div>
  );
}
