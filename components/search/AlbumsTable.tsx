"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchAlbumsProps } from "@/entity/interface/song";
import { throttle } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchAlbumsByArtistId,
  fetchAlbumsByKeyword,
} from "@/hooks/fetchAlbums";

type Props = {
  searchValue: string;
  loaderType: "search" | "artists";
};

const AlbumsTable = ({ searchValue, loaderType }: Props) => {
  const [result, setResult] = useState<SearchAlbumsProps[]>([]);
  const [page, setPage] = useState(0);
  const [toEnd, setToEnd] = useState(false);
  const [total, setTotal] = useState(0);

  let loaderData: (arg0: { signal: AbortSignal }) => void;
  const router = useRouter();

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

  if (loaderType === "search") {
    const { loaderData: _loaderData } = fetchAlbumsByKeyword({
      searchValue,
      page,
      result,
      setResult,
      toEnd,
      setTotal,
    });
    loaderData = _loaderData;
  } else if (loaderType === "artists") {
    const { loaderData: _loaderData } = fetchAlbumsByArtistId({
      id: searchValue,
      page,
      result,
      setResult,
      toEnd,
      setTotal,
    });
    loaderData = _loaderData;
  }

  useEffect(() => {
    // 重置状态
    setPage(0);
    setResult([]);
    setToEnd(false);

    // 创建新的 AbortController
    const controller = new AbortController();
    const { signal } = controller;

    // 使用新的控制器请求数据
    loaderData({ signal });

    // 清理：仅在组件卸载时取消请求
    return () => {
      controller.abort();
    };
  }, [searchValue]);

  useEffect(() => {
    // 创建新的 AbortController
    const controller = new AbortController();
    const { signal } = controller;
    loaderData({ signal });
    // 清理：仅在组件卸载时取消请求
    // return () => {
    //   controller.abort();
    // };
  }, [page]);

  const routeToDetail = (id: string) => {
    router.push(`/albums/${id}`);
  };
  return (
    <div
      className="flex items-center flex-col h-full overflow-auto"
      onScroll={handleScroll}>
      <Table className="">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="truncate max-w-40">标题</TableHead>
            <TableHead className="text-center">歌手</TableHead>
            <TableHead className="w-20">时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((album: SearchAlbumsProps, index) => (
            <TableRow key={index} onClick={() => routeToDetail(album.id)}>
              <TableCell className="font-medium truncate max-w-40">
                {album.name}
              </TableCell>
              <TableCell className="text-center">
                {album.artists
                  .map((item: { name: string }) => item.name)
                  .join(",")}
              </TableCell>
              <TableCell className="truncate w-20">{album.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {toEnd ? <div className="font-semibold">下面没有数据了</div> : <></>}
      {result.length === 0 ? <div className="font-semibold">暂无数据</div>:<></>}
    </div>
  );
};

export default AlbumsTable;
