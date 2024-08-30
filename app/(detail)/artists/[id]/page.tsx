import { fetchArtistsById } from "@/apis/artists/jio-savvn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MusicDropAction from "@/components/share/player/MusicDropAction";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchSongProps } from "@/entity/interface/song";
import { formatTime } from "@/lib/utils";

type PageProps = {
  params: {
    id: string;
  };
};
export default async function DetailPage({ params }: PageProps) {
  const artistsId = params.id || "0";
  const artistInfo = await fetchArtistsById(artistsId);
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
      <h2 className="mb-2 mt-4 font-medium text-xl">热门歌曲</h2>
      <div className="flex items-center flex-col h-full overflow-auto">
        <Table className="">
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="truncate max-w-40">音乐标题</TableHead>
              <TableHead className="md:table-cell hidden">专辑</TableHead>
              <TableHead className="md:table-cell hidden text-center">
                歌手
              </TableHead>
              <TableHead className="">时长</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artistInfo?.topSongs.map((song: SearchSongProps) => (
              <TableRow key={song.id}>
                <TableCell className="font-medium truncate max-w-40">
                  {song.name}
                </TableCell>
                <TableCell className="md:table-cell hidden truncate">
                  {song.album.name}
                </TableCell>
                <TableCell className="md:table-cell hidden text-center">
                  {song.artists
                    .map((item: { name: string }) => item.name)
                    .join(",")}
                </TableCell>
                <TableCell className="text-center flex items-center justify-start">
                  {formatTime(song.duration)}
                  <MusicDropAction songInfo={{ ...song }} fromType="noDel" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
