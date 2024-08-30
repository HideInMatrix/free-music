import { fetchArtistsById } from "@/apis/artists/jio-savvn";
import SongsTable from "@/components/search/SongsTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlbumsTable from "@/components/search/AlbumsTable";

type PageProps = {
  params: {
    id: string;
  };
};
export default async function DetailPage({ params }: PageProps) {
  const artistsId = params.id || "0";
  const artistInfo = await fetchArtistsById({ id: artistsId });
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
          <Suspense fallback={<div>loading</div>}>
            <SongsTable
              searchValue={artistsId}
              loaderType="artists"></SongsTable>
          </Suspense>
        </TabsContent>
        <TabsContent value="albums" className="flex-auto min-h-0">
          <Suspense fallback={<div>loading</div>}>
            <AlbumsTable
              searchValue={artistsId}
              loaderType="artists"></AlbumsTable>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
