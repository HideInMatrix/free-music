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
import { Dispatch, SetStateAction, startTransition, useEffect, useRef, useState } from "react";
import { 
  fetchSongsByKeyword,
  fetchArtistsByKeyword,
  fetchAlbumsByKeyword,
  fetchPlaylistDetailSongs
} from "@/hooks/fetchSongsByYtmusic";

type Props = {
  searchValue: string;
  loaderType: "search" | "detail" | "artists" | "playlists";
};

type ResultType = SearchSongProps | SearchAlbumsProps | SearchArtistProps | SearchPlaylistProps;

const SongsTable = ({ searchValue, loaderType }: Props) => {
  const [result, setResult] = useState<ResultType[]>([]);
  const [loading, setLoading] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  let loaderSongs: (arg0: { signal: AbortSignal }) => void;
  
  if (loaderType === "search") {
    startTransition(() => {
      const { loaderSongs: _loaderSongs } = fetchSongsByKeyword({
        searchValue,
        setResult: setResult as Dispatch<SetStateAction<SearchSongProps[]>>,
      });
      loaderSongs = _loaderSongs;
    });
  } else if (loaderType === "detail") {
    // 专辑详情使用专辑搜索
    startTransition(() => {
      const { loaderAlbums: _loaderSongs } = fetchAlbumsByKeyword({
        searchValue,
        setResult: setResult as Dispatch<SetStateAction<SearchAlbumsProps[]>>,
      });
      loaderSongs = _loaderSongs;
    });
  } else if (loaderType === "artists") {
    // 艺术家详情使用艺术家搜索
    startTransition(() => {
      const { loaderArtists: _loaderSongs } = fetchArtistsByKeyword({
        searchValue,
        setResult: setResult as Dispatch<SetStateAction<SearchArtistProps[]>>,
      });
      loaderSongs = _loaderSongs;
    });
  } else if (loaderType === "playlists") {
    // 播放列表详情使用播放列表搜索
    startTransition(() => {
      const { loaderPlaylistSongs: _loaderSongs } = fetchPlaylistDetailSongs({
        playlistId: searchValue,
        setResult: setResult as Dispatch<SetStateAction<SearchSongProps[]>>,
      });
      loaderSongs = _loaderSongs;
    });
  }

  useEffect(() => {
    // 重置状态
    setResult([]);
    setLoading(false);

    // 创建新的 AbortController
    const controller = new AbortController();
    const { signal } = controller;
    
    startTransition(() => {
      loaderSongs({ signal });
    });

    // 清理：仅在组件卸载时取消请求
    return () => {
      controller.abort();
    };
  }, [searchValue]);

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
