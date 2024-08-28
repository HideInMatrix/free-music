import { getRequest } from "@/lib/customFetch";

export const fetchAlbums = async (value: string, signal: AbortSignal) => {
  const response = await getRequest(
    `https://saavn.dev/api/search/albums`,
    { query: value, page: 0, limit: 5 },
    { signal }
  );

  if (response.success) {
    return response.data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      artists: item.artists.primary.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        image: artist.image,
      })),
      url: "",
    }));
  }
  return [];
};
