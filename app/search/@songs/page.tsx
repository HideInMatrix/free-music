import SearchTable from "@/components/search/SearchTable";

type PageProps = {
  searchParams: { keyword: string };
};

export default async function SongsPage({ searchParams }: PageProps) {
  const keyword = searchParams.keyword || "";

  return <SearchTable searchValue={keyword}></SearchTable>;
}
