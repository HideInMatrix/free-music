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
import { useNavigate } from "react-router-dom";

type Props = {
  result: SearchArtistProps[],
  loading: boolean;
};

const ArtistsTable = ({ result,loading }: Props) => {
  const navigate = useNavigate();

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
