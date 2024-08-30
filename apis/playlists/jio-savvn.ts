import { SearchPlaylistProps, SearchSongProps } from "@/entity/interface/song";
import { getRequest } from "@/lib/customFetch";

export const fetchPlaylists = async ({
  value,
  options,
  page = 0,
  limit = 5,
}: {
  value: string;
  options?: { signal: AbortSignal };
  page?: number;
  limit?: number;
}): Promise<{ data: SearchPlaylistProps[]; total: number }> => {
  const response = await getRequest(
    `https://saavn.dev/api/search/playlists`,
    { query: value, page, limit },
    { signal: options?.signal }
  );

  if (response.success) {
    return {
      data: response.data.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image[item.image.length - 1].url,
        songCount: item.songCount,
      })),
      total: response.data.total,
    };
  }
  return { data: [], total: 0 };
};

export const fetchSongsByPlaylistId = async ({
  value,
  options,
  page = 0,
  limit = 5,
}: {
  value: string;
  options?: { signal: AbortSignal };
  page?: number;
  limit?: number;
}): Promise<{ data: SearchSongProps[]; total: number }> => {
  const response = await getRequest(
    `https://saavn.dev/api/playlists`,
    { id: value, page, limit },
    { signal: options?.signal }
  );

  if (response.success) {
    return {
      data: response.data.songs.map((item: any) => ({
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
