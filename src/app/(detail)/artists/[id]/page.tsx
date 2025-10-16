import SongsTable from "@/components/search/SongsTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlbumsTable from "@/components/search/AlbumsTable";
import {
  useGetArtisAlbums,
  useGetArtisDetail,
  useGetArtisSongs,
} from "@/hooks/useApiFetch";

import { useParams } from "react-router-dom";

export default function DetailPage() {
  const params = useParams();
  const artistsId = params.id || "0";
  const { data: artistInfo } = useGetArtisDetail(artistsId);
  const { data: songs, loading: artisSongLoading } =
    useGetArtisSongs(artistsId);
  const { data: albums, loading: albumsLoading } = useGetArtisAlbums(artistsId);

  return (
    <div className="flex flex-col p-2 h-full">
      <div className="mb-2 flex items-center gap-2">
        <Avatar className="md:w-40 md:h-40 w-32 h-32 object-cover">
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
          <SongsTable result={songs} loading={artisSongLoading}></SongsTable>
        </TabsContent>
        <TabsContent value="albums" className="flex-auto min-h-0">
          <AlbumsTable result={albums} loading={albumsLoading}></AlbumsTable>
        </TabsContent>
      </Tabs>
    </div>
  );
}
