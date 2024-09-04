import SongsTable from "@/components/search/SongsTable";
import { useParams } from "react-router-dom";

const AlbumDetailPage = () => {
  const params = useParams();
  let albumId = params.id || "0";

  return <SongsTable searchValue={albumId} loaderType="detail"></SongsTable>;
};

export default AlbumDetailPage;
