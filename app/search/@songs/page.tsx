import { fetchSongs } from "@/apis/songs/jio-savvn";
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
  searchParams: { value: string };
};

export default async function SongsPage({ searchParams }: PageProps) {
  const value = searchParams.value || "";
  const result = await fetchSongs({ value, page: 0, limit: 20 });
  return (
    <div className="flex items-center flex-col">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-nowrap">音乐标题</TableHead>
            <TableHead className="">专辑</TableHead>
            <TableHead className="text-center">歌手</TableHead>
            <TableHead className="text-center w-[120px]">时长</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((item: SearchSongProps) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium truncate">
                {item.name}
              </TableCell>
              <TableCell className="truncate">{item.album.name}</TableCell>
              <TableCell className="text-center">
                {item.artists.map((item) => item.name).join(",")}
              </TableCell>
              <TableCell className="text-center">
                {formatTime(item.duration)}
              </TableCell>
              <TableCell className="w-20 flex items-center">
                <MusicDropAction songInfo={{ ...item }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
