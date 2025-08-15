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
import { useNavigate } from "react-router-dom";

type Props = {
  result:SearchAlbumsProps[],
  loading:boolean
};

const AlbumsTable = ({ result,loading }: Props) => {

  const navigate = useNavigate();

  const routeToDetail = (id: string) => {
    navigate(`/albums/${id}`);
  };

  return (
    <div className="flex items-center flex-col h-full overflow-auto">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="truncate max-w-40">标题</TableHead>
            <TableHead className="text-center">歌手</TableHead>
            <TableHead className="w-20">时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((album: SearchAlbumsProps) => (
            <TableRow key={album.id} onClick={() => routeToDetail(album.id)}>
              <TableCell className="font-medium truncate max-w-40">
                {album.name}
              </TableCell>
              <TableCell className="text-center">
                {album.artists.map((artist) => artist.name).join(",")}
              </TableCell>
              <TableCell className="truncate w-20">{album.year}</TableCell>
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

export default AlbumsTable;
