import SongsTable from "@/components/search/SongsTable";
import { useParams } from "react-router-dom";

const PlaylistDetailPage = () => {
  const params = useParams();
  let albumId = params.id || "0";

  return <SongsTable searchValue={albumId} loaderType="playlists"></SongsTable>;
};

export default PlaylistDetailPage;
