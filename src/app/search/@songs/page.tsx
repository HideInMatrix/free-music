import SongsTable from "@/components/search/SongsTable";
import { useSearchSongs } from "@/hooks/useApiFetch";
import { useSearchParams } from "react-router-dom";

export default function SongsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const {data,loading} = useSearchSongs(keyword);
  return <SongsTable result={data} loading={loading}></SongsTable>;
}
