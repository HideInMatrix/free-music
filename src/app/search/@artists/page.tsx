import ArtistsTable from "@/components/search/ArtistsTable";

import { useSearchParams } from "react-router-dom";
export default function ArtistsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  return <ArtistsTable searchValue={keyword || ""}></ArtistsTable>;
}
