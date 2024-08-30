import AlbumsTable from "@/components/search/AlbumsTable";

type PageProps = {
  searchParams: { keyword: string };
};

export default function AlbumsPage({ searchParams }: PageProps) {
  const keyword = searchParams.keyword || "";

  return <AlbumsTable searchValue={keyword} loaderType="search"></AlbumsTable>;
}
