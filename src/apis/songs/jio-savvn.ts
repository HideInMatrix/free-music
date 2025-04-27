import { SearchSongProps } from "@/entity/interface/song";
import { getRequest } from "@/lib/customFetch";
const backendURL = import.meta.env.VITE_BACKEND_PRE_URL || "https://saavn.dev";
export const fetchSongs = async ({
  value,
  options,
  page = 0,
  limit = 5,
}: {
  value: string;
  options?: { signal?: AbortSignal };
  page?: number;
  limit?: number;
}): Promise<{ data: SearchSongProps[]; total: number }> => {
  const response = await getRequest(
    `${backendURL}/api/search/songs`,
    { query: value, page, limit },
    options
  );
  if (response.success) {
    const results = response.data as { results: SearchSongProps[]; total: number };
    return {
      data: results.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        artists:
          item.artists?.primary.map((song: any) => ({
            id: song.id,
            name: song.name,
            image: song.image,
          })) || [],
        duration: item.duration,
        album: item.album,
        url: item.downloadUrl[item.downloadUrl.length - 1].url,
        image: item.image[item.image.length - 1].url,
      })),
      total: results.total,
    };
  }
  return { data: [], total: 0 };
};
