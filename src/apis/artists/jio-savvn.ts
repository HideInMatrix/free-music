import { SearchArtistProps, SearchSongProps } from "@/entity/interface/song";
import { getRequest } from "@/lib/customFetch";
const backendURL = import.meta.env.VITE_BACKEND_PRE_URL || "https://saavn.dev";
export const fetchArtists = async ({
  value,
  options,
  page = 0,
  limit = 5,
}: {
  value: string;
  options?: { signal?: AbortSignal };
  page?: number;
  limit?: number;
}): Promise<{ data: SearchArtistProps[]; total: number }> => {
  const response = await getRequest(
    `${backendURL}/api/search/artists`,
    { query: value, page, limit },
    { signal: options?.signal }
  );

  if (response.success) {
    return {
      data: response.data.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image[item.image.length - 1].url,
        url: "",
      })),
      total: response.data.total,
    };
  }
  return { data: [], total: 0 };
};

export const fetchArtistsById = async ({
  id,
}: {
  id: string;
}): Promise<{
  id: string;
  name: string;
  image: string;
  topSongs: SearchSongProps[];
} | null> => {
  const response = await getRequest(`${backendURL}/api/artists/${id}`);

  if (response.success) {
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.image[response.data.image.length - 1].url,
      topSongs: response.data.topSongs.map((song: any) => ({
        id: song.id,
        name: song.name,
        artists: song.artists.all.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image.length > 0 && item.image[item.image.length - 1].url,
        })),
        url: song.downloadUrl[song.downloadUrl.length - 1].url,
        image: song.image[song.image.length - 1].url,
        duration: song.duration,
        album: { name: song.album.name, id: song.album.id },
      })),
    };
  }
  return null;
};

export const fetchSongsByArtists = async ({
  id,
  options,
  page = 0,
}: {
  id: string;
  options?: { signal?: AbortSignal };
  page?: number;
}): Promise<{ data: SearchSongProps[]; total: number }> => {
  const response = await getRequest(
    `${backendURL}/api/artists/${id}/songs`,
    {
      page,
      sortBy: "latest",
    },
    { signal: options?.signal }
  );

  if (response.success) {
    return {
      data: response.data.songs.map((song: any) => ({
        id: song.id,
        name: song.name,
        artists: song.artists.all.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image.length > 0 && item.image[item.image.length - 1].url,
        })),
        url: song.downloadUrl[song.downloadUrl.length - 1].url,
        image: song.image[song.image.length - 1].url,
        duration: song.duration,
        album: { name: song.album.name, id: song.album.id },
      })),
      total: response.data.total,
    };
  }
  return { data: [], total: 0 };
};
