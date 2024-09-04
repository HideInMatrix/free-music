import AlbumsTable from "@/components/search/AlbumsTable";

import { useSearchParams } from "react-router-dom";
export default function AlbumsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  return <AlbumsTable searchValue={keyword} loaderType="search"></AlbumsTable>;
}
