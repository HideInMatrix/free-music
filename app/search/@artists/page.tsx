import ArtistsTable from "@/components/search/ArtistsTable";

type PageProps = {
  searchParams: { keyword: string };
};
export default async function ArtistsPage({ searchParams }: PageProps) {
  return <ArtistsTable searchValue={searchParams.keyword || ""}></ArtistsTable>;
}
