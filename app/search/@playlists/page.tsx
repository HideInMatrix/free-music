import PlaylistsTable from "@/components/search/PlaylistsTable";
import { Suspense } from "react";

type PageProps = {
  searchParams: { keyword: string };
};
export default function PlaylistsPage({ searchParams }: PageProps) {
  const keyword = searchParams.keyword || "";
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <PlaylistsTable searchValue={keyword}></PlaylistsTable>
    </Suspense>
  );
}
