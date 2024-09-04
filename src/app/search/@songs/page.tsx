import SongsTable from "@/components/search/SongsTable";
import { useSearchParams } from "react-router-dom";

export default function SongsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  return <SongsTable searchValue={keyword} loaderType="search"></SongsTable>;
}
