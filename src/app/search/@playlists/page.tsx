import PlaylistsTable from "@/components/search/PlaylistsTable";
import { useSearchParams } from "react-router-dom";

export default function PlaylistsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  return <PlaylistsTable searchValue={keyword}></PlaylistsTable>;
}
