import { getActivePlugin } from "@/store/useSourceStore";
import SongsTable from "@/components/search/SongsTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { startTransition, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlbumsTable from "@/components/search/AlbumsTable";

import { useParams } from "react-router-dom";
import { SearchSongProps } from "@/entity/interface/song";

export default function DetailPage() {
  const params = useParams();
  const artistsId = params.id || "0";
  const [artistInfo, setArtistsInfo] = useState<{
    id: string;
    name: string;
    image: string;
    topSongs: SearchSongProps[];
  } | null>();
  useEffect(() => {
    // 创建新的 AbortController
    const controller = new AbortController();
    const { signal } = controller;
    startTransition(() => {
      const plugin = getActivePlugin();
      plugin?.getArtistDetail?.(artistsId, { signal }).then((result) => {
        setArtistsInfo(result ?? null);
      });
    });
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, []);
  return (
    <div className="flex flex-col p-2 h-full">
      <div className="mb-2 flex items-center gap-2">
        <Avatar className="md:w-40 md:h-40 w-32 h-32">
          <AvatarImage src={artistInfo?.image} />
          <AvatarFallback>{artistInfo?.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="font-semibold text-2xl">{artistInfo?.name}</h1>
        </div>
      </div>
      <Tabs defaultValue="songs" className="flex-auto flex flex-col min-h-0">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="songs">歌曲</TabsTrigger>
          <TabsTrigger value="albums">专辑</TabsTrigger>
        </TabsList>
        <TabsContent value="songs" className="flex-auto min-h-0">
          <SongsTable searchValue={artistsId} loaderType="artists"></SongsTable>
        </TabsContent>
        <TabsContent value="albums" className="flex-auto min-h-0">
          <AlbumsTable
            searchValue={artistsId}
            loaderType="artists"></AlbumsTable>
        </TabsContent>
      </Tabs>
    </div>
  );
}
