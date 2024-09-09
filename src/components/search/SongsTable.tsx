"use client";
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
import { formatTime, throttle } from "@/lib/utils";
import { startTransition, useEffect, useState } from "react";

import {
  fetchSongByKeyword,
  fetchSongByAlbumId,
  fetchSongByArtistId,
} from "@/hooks/fetchSongs";
import { fetchPlaylistById } from "@/hooks/fetchPlaylists";

type Props = {
  searchValue: string;
  loaderType: "search" | "detail" | "artists" | "playlists";
};

const SongsTable = ({ searchValue, loaderType }: Props) => {
  const [result, setResult] = useState<SearchSongProps[]>([]);
  const [page, setPage] = useState(0);
  const [toEnd, setToEnd] = useState(false);
  const [total, setTotal] = useState(0);

  let loaderSongs: (arg0: { signal: AbortSignal }) => void;
  if (loaderType === "search") {
    startTransition(() => {
      const { loaderSongs: _loaderSongs } = fetchSongByKeyword({
        searchValue,
        page,

        setResult,
        toEnd,
        setTotal,
      });
      loaderSongs = _loaderSongs;
    });
  } else if (loaderType === "detail") {
    startTransition(() => {
      const { loaderSongs: _loaderSongs } = fetchSongByAlbumId({
        albumId: searchValue,
        page,

        setResult,
        toEnd,
        setTotal,
      });
      loaderSongs = _loaderSongs;
    });
  } else if (loaderType === "artists") {
    startTransition(() => {
      const { loaderSongs: _loaderSongs } = fetchSongByArtistId({
        artistId: searchValue,
        page,

        setResult,
        toEnd,
        setTotal,
      });
      loaderSongs = _loaderSongs;
    });
  } else if (loaderType === "playlists") {
    startTransition(() => {
      const { loaderData: _loaderSongs } = fetchPlaylistById({
        id: searchValue,
        page,
        setResult,
        toEnd,
        setTotal,
      });
      loaderSongs = _loaderSongs;
    });
  }

  const handleScroll = throttle(async (event: Event) => {
    const target = event.target as HTMLDivElement; // 确保类型安全
    const { scrollTop, scrollHeight, clientHeight } = target;

    if ((page + 1) * 20 >= total) {
      setToEnd(true);
    }
    // 判断是否接近底部
    if (scrollHeight - scrollTop - clientHeight <= 50 && !toEnd) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 250);

  useEffect(() => {
    // 重置状态
    setPage(0);
    setResult([]);
    setToEnd(false);

    // 创建新的 AbortController
    const controller = new AbortController();
    const { signal } = controller;
    startTransition(() => {
      // 使用新的控制器请求数据
      loaderSongs({ signal });
    });

    // 清理：仅在组件卸载时取消请求
    return () => {
      controller.abort();
    };
  }, [searchValue]);

  useEffect(() => {
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
  }, [page]);
  return (
    <div
      className="flex items-center flex-col h-full overflow-auto"
      onScroll={handleScroll}>
      <Table className="">
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
          {result.map((song: SearchSongProps, index) => (
            <TableRow key={index}>
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
                <MusicDropAction songInfo={{ ...song }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {toEnd ? <div className="font-semibold">下面没有数据了</div> : <></>}
      {result.length === 0 ? (
        <div className="font-semibold">暂无数据</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SongsTable;
