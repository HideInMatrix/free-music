import { fetchSongs } from "@/apis/search";

type PageProps = {
  searchParams: { value: string };
};

export default async function SongsPage({ searchParams }: PageProps) {
  const value = searchParams.value || "";
  const controller = new AbortController();
  const { signal } = controller;
  const result = await fetchSongs(value, signal);
  // console.log(result);

  return <>songsPage</>;
}
