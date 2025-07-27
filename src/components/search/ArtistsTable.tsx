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
import { fetchArtistsByKeyword } from "@/hooks/fetchSongsByYtmusic";
import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  searchValue: string;
};

const ArtistsTable = ({ searchValue }: Props) => {
  const [result, setResult] = useState<SearchArtistProps[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let loaderData: (arg0: { signal: AbortSignal }) => void;

  startTransition(() => {
    const { loaderArtists: _loaderData } = fetchArtistsByKeyword({
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
    navigate(`/artists/${id}`);
  };

  return (
    <div className="flex items-center flex-col h-full overflow-auto">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="truncate">歌手</TableHead>
            <TableHead className="w-40 text-center">头像</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((artist: SearchArtistProps) => (
            <TableRow key={artist.id} onClick={() => routeToDetail(artist.id)}>
              <TableCell className="font-medium truncate">
                {artist.name}
              </TableCell>
              <TableCell className="flex items-center justify-center max-w-40">
                <img
                  loading="lazy"
                  src={artist.image}
                  alt="cover"
                  width={40}
                  height={40}
                />
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

export default ArtistsTable;
