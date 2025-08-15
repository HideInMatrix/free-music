import ArtistsTable from "@/components/search/ArtistsTable";
import { useGetArtistsByKeyword } from "@/hooks/useApiFetch";

import { useSearchParams } from "react-router-dom";
export default function ArtistsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const {data,loading} = useGetArtistsByKeyword(keyword);
  return <ArtistsTable result={data} loading={loading}></ArtistsTable>;
}
