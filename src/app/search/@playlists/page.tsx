import PlaylistsTable from "@/components/search/PlaylistsTable";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";

export default function PlaylistsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <PlaylistsTable searchValue={keyword}></PlaylistsTable>
    </Suspense>
  );
}
