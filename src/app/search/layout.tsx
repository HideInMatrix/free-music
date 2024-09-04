"use client";
import { startTransition, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

export default function SearchLayout() {
  const triggers = [
    { name: "歌曲", value: "songs" },
    { name: "专辑", value: "albums" },
    { name: "艺术家", value: "artists" },
    { name: "播放列表", value: "playlists" },
  ];
  const [searchParams] = useSearchParams();

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
  }, [searchParams]);

  const navigate = useNavigate();
  const handleValueChange = (value: string) => {
    startTransition(() => {
      setPageType(value);
      navigate(`/search/${value}?keyword=${keyword || ""}&type=${value}`);
    });
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
        <div className="flex-auto overflow-auto">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
}
