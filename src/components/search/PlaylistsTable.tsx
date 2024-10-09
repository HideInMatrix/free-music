import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchPlaylistProps } from "@/entity/interface/song";
import { checkAndLoadMore, throttle } from "@/lib/utils";
import { startTransition, useEffect, useRef, useState } from "react";
import { fetchPlaylistsByKeyword } from "@/hooks/fetchPlaylists";
import { useNavigate } from "react-router-dom";

type Props = {
  searchValue: string;
};

const PlaylistsTable = ({ searchValue }: Props) => {
  const [result, setResult] = useState<SearchPlaylistProps[]>([]);
  const [page, setPage] = useState(0);
  const [toEnd, setToEnd] = useState(false);
  const [total, setTotal] = useState(0);
  const tableContainerRef = useRef<HTMLDivElement>(null); // 添加一个 ref 用于获取容器高度

  let loaderData: (arg0: { signal: AbortSignal }) => void;
  startTransition(() => {
    const { loaderData: _loaderData } = fetchPlaylistsByKeyword({
      searchValue,
      page,
      setResult,
      toEnd,
      setTotal,
    });
    loaderData = _loaderData;
  });
  const navigate = useNavigate();
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
    // 使用新的控制器请求数据
    startTransition(() => {
      loaderData({ signal });
    });
    // 检查容器高度，自动加载更多数据
    checkAndLoadMore({ containerRef: tableContainerRef, toEnd, setPage });

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
      loaderData({ signal });
    });
    // 清理：仅在组件卸载时取消请求
    return () => {
      if (toEnd) {
        controller.abort();
      }
    };
  }, [page]);
  const routeToDetail = (id: string) => {
    navigate(`/playlists/${id}`);
  };
  return (
    <div
      ref={tableContainerRef}
      className="flex items-center flex-col h-full overflow-auto"
      onScroll={handleScroll}>
      <Table className="">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="truncate ">名称</TableHead>
            <TableHead className="md:table-cell max-w-20 text-center">
              歌曲数
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((data: SearchPlaylistProps, index) => (
            <TableRow key={index} onClick={() => routeToDetail(data.id)}>
              <TableCell className="font-medium truncate ">
                {data.name}
              </TableCell>
              <TableCell className="md:table-cell text-center truncate max-w-20">
                {data.songCount}
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

export default PlaylistsTable;
