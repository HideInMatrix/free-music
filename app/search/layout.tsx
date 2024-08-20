"use client";
import { ReactNode, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  const [pageType, setPageType] = useState("songs");
  const [value, setValue] = useState("");
  useEffect(() => {
    let _pageType = searchParams.get("page");
    if (_pageType) {
      setPageType(_pageType);
    }
    let _value = searchParams.get("value");
    if (_value) {
      setValue(_value);
    }
  }, [searchParams.get("page")]);
  const handleValueChange = (value: string) => {
    setPageType(value);
  };

  return (
    <div className="flex-auto">
      <div className="m-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="关键字"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <Tabs value={pageType} className="m-2" onValueChange={handleValueChange}>
        <TabsList className="grid w-full grid-cols-4">
          {triggers.map((trigger) => (
            <TabsTrigger value={trigger.value} key={trigger.value}>
              {trigger.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="song">{songs}</TabsContent>
        <TabsContent value="album">{albums}</TabsContent>
        <TabsContent value="artist">{artists}</TabsContent>
        <TabsContent value="playlist">{playlists}</TabsContent>
      </Tabs>
    </div>
  );
}
