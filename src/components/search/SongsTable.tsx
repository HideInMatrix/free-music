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
import { SearchSongProps, SearchAlbumsProps, SearchArtistProps, SearchPlaylistProps } from "@/entity/interface/song";
import { formatTime } from "@/lib/utils";
import { useRef } from "react";



type ResultType = SearchSongProps | SearchAlbumsProps | SearchArtistProps | SearchPlaylistProps;

type Props = {
  loading:boolean,
  result: ResultType[];
};



const SongsTable = ({ loading,result}: Props) => {
  
  const tableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={tableContainerRef}
      className="flex items-center flex-col h-full overflow-auto">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="truncate max-w-40">音乐标题</TableHead>
            <TableHead className="md:table-cell hidden">专辑</TableHead>
            <TableHead className="md:table-cell hidden text-center">
              歌手
            </TableHead>
            <TableHead className="w-20">时长</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((item: ResultType) => {
            // 类型守卫判断
            if ('duration' in item) { // 是歌曲类型
              const song = item as SearchSongProps;
              return (
                <TableRow key={song.id}>
                  <TableCell className="font-medium truncate max-w-40">
                    {song.name}
                  </TableCell>
                  <TableCell className="md:table-cell hidden truncate">
                    {song.album.name}
                  </TableCell>
                  <TableCell className="md:table-cell hidden text-center">
                    {song.artists[0]?.name}
                  </TableCell>
                  <TableCell className="text-center flex items-center justify-start">
                    {formatTime(song.duration)}
                    <MusicDropAction songInfo={song} />
                  </TableCell>
                </TableRow>
              );
            }
            return null;
          })}
        </TableBody>
      </Table>
      {loading && <div className="font-semibold">加载中...</div>}
      {!loading && result.length === 0 && (
        <div className="font-semibold">暂无数据</div>
      )}
    </div>
  );
};

export default SongsTable;
