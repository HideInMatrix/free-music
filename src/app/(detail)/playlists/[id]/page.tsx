import SongsTable from "@/components/search/SongsTable";
import { useGetPlaylistDetail } from "@/hooks/useApiFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PlaylistDetailPage = () => {
  const params = useParams();
  let playlistId = params.id || "0";
  const {data, loading} = useGetPlaylistDetail(playlistId);
  useEffect(() => {
    console.log(data);
    
  }, [data]);
  return <SongsTable result={data} loading={loading}></SongsTable>;
};

export default PlaylistDetailPage;
