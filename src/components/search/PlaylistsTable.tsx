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
import { useNavigate } from "react-router-dom";
import { Loading } from "../loading";

type Props = {
  result: SearchPlaylistProps[],
  loading: boolean; 
};

const PlaylistsTable = ({ result,loading }: Props) => {

  const navigate = useNavigate();
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
              封面
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
                <img src={playlist.image} alt="cover" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && (
        <div className="flex items-center justify-center h-full">
          <Loading  visible={loading} message="Loading" />
        </div>
      )}
      {!loading && result.length === 0 && (
        <div className="font-semibold">暂无数据</div>
      )}
    </div>
  );
};

export default PlaylistsTable;
