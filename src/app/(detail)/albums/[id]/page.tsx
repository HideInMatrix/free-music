import SongsTable from "@/components/search/SongsTable";
import { useParams } from "react-router-dom";
import {useGetAlbumsDetail} from "@/hooks/useApiFetch";


const AlbumDetailPage = () => {
  const params = useParams();
  let albumId = params.id || "";  
  const {data,loading} = useGetAlbumsDetail(albumId);
  return <SongsTable result={data} loading={loading}></SongsTable>;
};

export default AlbumDetailPage;
