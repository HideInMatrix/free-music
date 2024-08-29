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
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { fetchSongs } from "@/apis/songs/jio-savvn";

type Props = {
  searchValue: string;
};

const SearchTable = ({ searchValue }: Props) => {
  const [result, setResult] = useState<SearchSongProps[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toEnd, setToEnd] = useState(false);

  const handleScroll = throttle(async (event: Event) => {
    const target = event.target as HTMLDivElement; // 确保类型安全
    const { scrollTop, scrollHeight, clientHeight } = target;

    // 判断是否接近底部
    if (scrollHeight - scrollTop - clientHeight <= 50 && !toEnd) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 250);

  const loaderProfile = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      if (loading || toEnd) return; // 如果正在加载，或者已经到达底部，直接返回
      setLoading(true);

      try {
        const _result = await fetchSongs({
          value: searchValue,
          page,
          limit: 20,
          options: { signal: signal },
        });
        if (_result.length === 0) {
          setToEnd(true);
        }
        const mergedResult = [...result, ..._result].reduce((acc, song) => {
          if (!acc.some((s: SearchSongProps) => s.id === song.id)) {
            acc.push(song);
          }
          return acc;
        }, [] as SearchSongProps[]);
        setResult(mergedResult);
      } catch (error: unknown) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [page, searchValue]
  );

  useEffect(() => {
    // 重置状态
    setPage(0);
    setResult([]);
    setToEnd(false);

    // 创建新的 AbortController
    const controller = new AbortController();
    const { signal } = controller;

    // 使用新的控制器请求数据
    loaderProfile({ signal });

    // 清理：仅在组件卸载时取消请求
    return () => {
      controller.abort();
    };
  }, [searchValue]);

  useEffect(() => {
    // 创建新的 AbortController
    const controller = new AbortController();
    const { signal } = controller;
    loaderProfile({ signal });
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
            <TableHead className="w-[120px]">时长</TableHead>
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
    </div>
  );
};

export default SearchTable;
