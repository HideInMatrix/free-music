import { SearchAlbumsProps, SearchSongProps,SearchArtistProps, SearchPlaylistProps } from "@/entity/interface/song";
import { getRequest } from "@/lib/customFetch";
const backendURL = import.meta.env.VITE_BACKEND_PRE_URL || "https://saavn.dev";
// console.log(import.meta.env);

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
    `${backendURL}/api/search/albums`,
    { query: value, page, limit },
    { signal: options?.signal }
  );

  if (response.success) {
    const result = response.data as {results:any[],total:number}
    return {
      data: result.results.map((item: any) => ({
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
        image: item.image[item.image.length - 1].url,
      })),
      total: result.total,
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
    `${backendURL}/api/albums`,
    {
      id,
    },
    { signal: options?.signal }
  );
  if (response.success) {
    const result = response.data as {songs:any[],songCount:number}
    let data = result.songs.map((item: any) => ({
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
      total: result.songCount,
    };
  }
  return { data: [], total: 0 };
};

export const fetchAlbumsByArtistIdFn = async ({
  id,
  page = 0,
  options,
}: {
  id: string;
  page: number;
  options?: { signal?: AbortSignal };
}): Promise<{ data: SearchAlbumsProps[]; total: number }> => {
  const response = await getRequest(
    `${backendURL}/api/artists/${id}/albums`,
    {
      page,
      sortBy: "alphabetical",
    },
    { signal: options?.signal }
  );
  if (response.success) {
    const result = response.data as {albums:any[],total:number}
    return {
      data: result.albums.map((album: any) => ({
        id: album.id,
        name: album.name,
        artists:
          album.artists.primary.map((artist: any) => ({
            id: artist.id,
            name: artist.name,
            image: artist.image,
          })) || [],
        playCount: album.playCount || 0,
        year: album.year || 1996,
        image:''
      })),
      total: result.total,
    };
  }
  return { total: 0, data: [] };
};



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


export const fetchPlaylists = async ({
  value,
  options,
  page = 0,
  limit = 5,
}: {
  value: string;
  options?: { signal?: AbortSignal };
  page?: number;
  limit?: number;
}): Promise<{ data: SearchPlaylistProps[]; total: number }> => {
  const response = await getRequest(
    `${backendURL}/api/search/playlists`,
    { query: value, page, limit },
    { signal: options?.signal }
  );

  if (response.success) {
    const results = response.data as { results: SearchPlaylistProps[]; total: number };
    return {
      data: results.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image[item.image.length - 1].url,
        songCount: item.songCount,
      })),
      total: results.total,
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
  options?: { signal?: AbortSignal };
  page?: number;
  limit?: number;
}): Promise<{ data: SearchSongProps[]; total: number }> => {
  const response = await getRequest(
    `${backendURL}/api/playlists`,
    { id: value, page, limit },
    { signal: options?.signal }
  );

  if (response.success) {
    const results = response.data as { songs: SearchSongProps[]; total: number };
    return {
      data: results.songs.map((item: any) => ({
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

export const fetchSongById = async ({id}: {id:string}) => {
  const response = await getRequest(`${backendURL}/api/songs/${id}`);
  if (response.success) {
    const results = response.data as SearchSongProps[];

    return {
      data: results.map((item: any) => ({
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
      }))
    }
  }
  return null;
}

// ================= Provider 兼容包装（保持向后兼容，不破坏现有导出） =================

export const searchSongs = async (
  keyword: string,
  options?: { signal?: AbortSignal }
): Promise<SearchSongProps[]> => {
  const resp = await fetchSongs({ value: keyword, options })
  return resp.data
}

export const searchAlbums = async (
  keyword: string,
  options?: { signal?: AbortSignal }
): Promise<SearchAlbumsProps[]> => {
  const resp = await fetchAlbums({ value: keyword, options })
  return resp.data
}

export const searchArtists = async (
  keyword: string,
  options?: { signal?: AbortSignal }
): Promise<SearchArtistProps[]> => {
  const resp = await fetchArtists({ value: keyword, options })
  return resp.data
}

export const searchPlaylists = async (
  keyword: string,
  options?: { signal?: AbortSignal }
): Promise<SearchPlaylistProps[]> => {
  const resp = await fetchPlaylists({ value: keyword, options })
  return resp.data
}

export const getAlbumDetail = async (
  albumId: string,
  options?: { signal?: AbortSignal }
): Promise<{ albumInfo: SearchAlbumsProps; songs: SearchSongProps[] }> => {
  const resp = await fetchSongsByAlbumId({ id: albumId, options })
  const songs = resp.data
  const first = songs[0]
  const albumInfo: SearchAlbumsProps = {
    id: albumId,
    name: (first as any)?.album?.name || "",
    artists: first?.artists || [],
    playCount: 0,
    year: 0,
    image: first?.image || "",
  }
  return { albumInfo, songs }
}

export const getPlaylistDetail = async (
  playlistId: string,
  options?: { signal?: AbortSignal }
): Promise<SearchSongProps[]> => {
  const resp = await fetchSongsByPlaylistId({ value: playlistId, options })
  return resp.data
}