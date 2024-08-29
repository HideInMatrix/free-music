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
import { useCallback, useEffect, useState } from "react";
import { fetchAlbums } from "@/apis/albums/jio-savvn";
import { useRouter } from "next/navigation";

type Props = {
  searchValue: string;
};

const AlbumsTable = ({ searchValue }: Props) => {
  const [result, setResult] = useState<SearchAlbumsProps[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toEnd, setToEnd] = useState(false);
  const [total, setTotal] = useState(0);

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

  const loaderProfile = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      if (loading || toEnd) return; // 如果正在加载，或者已经到达底部，直接返回
      setLoading(true);

      try {
        const { data, total } = await fetchAlbums({
          value: searchValue,
          page,
          limit: 20,
          options: { signal: signal },
        });
        setTotal(total);
        const mergedResult = [...result, ...data].reduce((acc, album) => {
          if (!acc.some((s: SearchAlbumsProps) => s.id === album.id)) {
            acc.push(album);
          }
          return acc;
        }, [] as SearchAlbumsProps[]);
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
            <TableHead className="md:table-cell hidden text-center">
              歌手
            </TableHead>
            <TableHead className="w-[120px]">时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((album: SearchAlbumsProps, index) => (
            <TableRow key={index} onClick={() => routeToDetail(album.id)}>
              <TableCell className="font-medium truncate max-w-40">
                {album.name}
              </TableCell>
              <TableCell className="md:table-cell hidden text-center">
                {album.artists
                  .map((item: { name: string }) => item.name)
                  .join(",")}
              </TableCell>
              <TableCell className="md:table-cell hidden truncate">
                {album.year}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {toEnd ? <div className="font-semibold">下面没有数据了</div> : <></>}
    </div>
  );
};

export default AlbumsTable;
