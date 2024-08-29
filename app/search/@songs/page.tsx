import SongsTable from "@/components/search/SongsTable";

type PageProps = {
  searchParams: { keyword: string };
};

export default async function SongsPage({ searchParams }: PageProps) {
  const keyword = searchParams.keyword || "";

  return <SongsTable searchValue={keyword} loaderType="search"></SongsTable>;
}
