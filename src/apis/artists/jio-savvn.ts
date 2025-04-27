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
    const results = response.data as {results:SearchArtistProps[];total:number}
    return {
      data: results.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image[item.image.length - 1].url,
        url: "",
      })),
      total: results.total,
    };
  }
  return { data: [], total: 0 };
};

export const fetchArtistsById = async ({
  id,
  options,
}: {
  id: string;
  options?: { signal?: AbortSignal };
}): Promise<{
  id: string;
  name: string;
  image: string;
  topSongs: SearchSongProps[];
} | null> => {
  const response = await getRequest(`${backendURL}/api/artists/${id}`, {
    signal: options?.signal,
  });

  if (response.success) {
    const results = response.data as {id:string,name:string,image:{url:string}[],topSongs:SearchSongProps[]}
    return {
      id: results.id,
      name: results.name,
      image: results.image[results.image.length - 1].url,
      topSongs: results.topSongs.map((song: any) => ({
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
    const results = response.data as {songs:SearchSongProps[];total:number}
    return {
      data: results.songs.map((song: any) => ({
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
      total: results.total,
    };
  }
  return { data: [], total: 0 };
};
