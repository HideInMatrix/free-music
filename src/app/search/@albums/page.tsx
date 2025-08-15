import AlbumsTable from "@/components/search/AlbumsTable";
import { useGetAlbums } from "@/hooks/useApiFetch";

import { useSearchParams } from "react-router-dom";
export default function AlbumsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const {data,loading} = useGetAlbums(keyword);

  return <AlbumsTable result={data} loading={loading}></AlbumsTable>;
}
