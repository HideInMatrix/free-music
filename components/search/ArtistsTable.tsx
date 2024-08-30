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
import { SearchArtistProps } from "@/entity/interface/song";
import { debounce, throttle } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchArtists } from "@/apis/artists/jio-savvn";
import Image from "next/image";

type Props = {
  searchValue: string;
};

const ArtistsTable = ({ searchValue }: Props) => {
  const [result, setResult] = useState<SearchArtistProps[]>([]);
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

  const loadData = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || toEnd) return; // 如果正在加载，或者已经到达底部，直接返回
      setLoading(true);

      try {
        const { data, total } = await fetchArtists({
          value: searchValue,
          page,
          limit: 20,
          options: { signal: signal },
        });

        setTotal(total);
        setResult((preResult) =>
          [...preResult, ...data].reduce((acc, artist) => {
            if (!acc.some((s: SearchArtistProps) => s.id === artist.id)) {
              acc.push(artist);
            }
            return acc;
          }, [] as SearchArtistProps[])
        );
      } catch (error: unknown) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 250),
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
    loadData({ signal });

    // 清理：仅在组件卸载时取消请求
    return () => {
      controller.abort();
    };
  }, [searchValue]);

  useEffect(() => {
    // 创建新的 AbortController
    const controller = new AbortController();
    const { signal } = controller;
    loadData({ signal });
    // 清理：仅在组件卸载时取消请求
    return () => {
      controller.abort();
    };
  }, [page]);

  const routeToDetail = (id: string) => {
    router.push(`/artists/${id}`);
  };
  return (
    <div
      className="flex items-center flex-col h-full overflow-auto"
      onScroll={handleScroll}>
      <Table className="">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="truncate">歌手</TableHead>
            <TableHead className="w-40 text-center">头像</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((artist: SearchArtistProps, index) => (
            <TableRow key={index} onClick={() => routeToDetail(artist.id)}>
              <TableCell className="font-medium truncate">
                {artist.name}
              </TableCell>
              <TableCell className="flex items-center justify-center max-w-40">
                <Image
                  loading="lazy"
                  src={artist.image}
                  alt="cover"
                  width={40}
                  height={40}></Image>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {toEnd ? <div className="font-semibold">下面没有数据了</div> : <></>}
    </div>
  );
};

export default ArtistsTable;
