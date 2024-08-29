import { SearchSongProps } from "@/entity/interface/song";
import { getRequest } from "@/lib/customFetch";

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
    `https://saavn.dev/api/search/songs`,
    { query: value, page, limit },
    options
  );
  if (response.success) {
    return {
      data: response.data.results.map((item: any) => ({
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
      total: response.data.total,
    };
  }
  return { data: [], total: 0 };
};
