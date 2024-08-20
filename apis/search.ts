import { Song } from "@/entity/interface/song";
import { getRequest } from "@/lib/customFetch";

export const fetchSongs = async (value: string, signal: AbortSignal) => {
  const response = await getRequest(
    `https://saavn.dev/api/search/songs`,
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
      url: item.downloadUrl[item.downloadUrl.length - 1].url,
    }));
  }
  return [];
};

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

export const fetchArtists = async (
  value: string,
  signal: AbortSignal,
  page = 0,
  limit = 5
) => {
  const response = await getRequest(
    `https://saavn.dev/api/search/artists`,
    { query: value, page, limit },
    { signal }
  );

  if (response.success) {
    return response.data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      url: "",
    }));
  }
  return [];
};

export const fetchPlaylists = async (value: string, signal: AbortSignal) => {
  const response = await getRequest(
    `https://saavn.dev/api/search/playlists`,
    { query: value, page: 0, limit: 5 },
    { signal }
  );

  if (response.success) {
    return response.data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      url: "",
    }));
  }
  return [];
};
