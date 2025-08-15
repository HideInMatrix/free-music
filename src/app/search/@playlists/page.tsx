import PlaylistsTable from "@/components/search/PlaylistsTable";
import { useGetPlaylistsByKeyword } from "@/hooks/useApiFetch";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PlaylistsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const {data, loading} = useGetPlaylistsByKeyword(keyword);
  useEffect(() => {
    console.log("PlaylistsPage data:", data, "loading:", loading);
    
  }, [loading,data]);
  return <PlaylistsTable result={data} loading={loading}></PlaylistsTable>;
}
