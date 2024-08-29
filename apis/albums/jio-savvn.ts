import { SearchAlbumsProps, SearchSongProps } from "@/entity/interface/song";
import { getRequest } from "@/lib/customFetch";

export const fetchAlbums = async ({
  value,
  options,
  page = 0,
  limit = 5,
}: {
  value: string;
  options?: { signal?: AbortSignal };
  page?: number;
  limit?: number;
}): Promise<{ data: SearchAlbumsProps[]; total: number }> => {
  const response = await getRequest(
    `https://saavn.dev/api/search/albums`,
    { query: value, page, limit },
    { signal: options?.signal }
  );

  if (response.success) {
    return {
      data: response.data.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        artists:
          item.artists.primary.map((artist: any) => ({
            id: artist.id,
            name: artist.name,
            image: artist.image,
          })) || [],
        playCount: item.playCount || 0,
        year: item.year || 1996,
      })),
      total: response.data.total,
    };
  }
  return { data: [], total: 0 };
};

export const fetchSongsByAlbumId = async ({
  id,
  options,
}: {
  id: string;
  options?: { signal?: AbortSignal };
}): Promise<{ data: SearchSongProps[]; total: number }> => {
  const response = await getRequest(
    `https://saavn.dev/api/albums`,
    {
      id,
    },
    { signal: options?.signal }
  );
  if (response.success) {
    let data = response.data.songs.map((item: any) => ({
      id: item.id,
      name: item.name,
      artists:
        item.artists?.primary.map((artist: any) => ({
          id: artist.id,
          name: artist.name,
          image: artist.image,
        })) || [],
      album: item.album,
      duration: item.duration,
      url: item.downloadUrl[item.downloadUrl.length - 1].url,
      image: item.image[item.image.length - 1].url,
    }));
    return {
      data,
      total: response.data.songCount,
    };
  }
  return { data: [], total: 0 };
};
