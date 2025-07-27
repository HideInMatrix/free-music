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
import { startTransition, useEffect, useState } from "react";
import { fetchPlaylistsByKeyword } from "@/hooks/fetchSongsByYtmusic";
import { useNavigate } from "react-router-dom";

type Props = {
  searchValue: string;
};

const PlaylistsTable = ({ searchValue }: Props) => {
  const [result, setResult] = useState<SearchPlaylistProps[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let loaderData: (arg0: { signal: AbortSignal }) => void;

  startTransition(() => {
    const { loaderPlaylists: _loaderData } = fetchPlaylistsByKeyword({
      searchValue,
      setResult,
    });
    loaderData = _loaderData;
  });

  useEffect(() => {
    // 重置状态
    setResult([]);
    setLoading(false);

    const controller = new AbortController();
    const { signal } = controller;

    startTransition(() => {
      loaderData({ signal });
    });

    return () => {
      controller.abort();
    };
  }, [searchValue]);

  const routeToDetail = (id: string) => {
    navigate(`/playlists/${id}`);
  };

  return (
    <div className="flex items-center flex-col h-full overflow-auto">
      <Table>
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
          {result.map((playlist: SearchPlaylistProps) => (
            <TableRow
              key={playlist.id}
              onClick={() => routeToDetail(playlist.id)}>
              <TableCell className="font-medium truncate">
                {playlist.name}
              </TableCell>
              <TableCell className="md:table-cell text-center truncate max-w-20">
                {playlist.songCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && <div className="font-semibold">加载中...</div>}
      {!loading && result.length === 0 && (
        <div className="font-semibold">暂无数据</div>
      )}
    </div>
  );
};

export default PlaylistsTable;
