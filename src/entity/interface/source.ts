import { SearchAlbumsProps, SearchArtistProps, SearchPlaylistProps, SearchSongProps } from "@/entity/interface/song";

export type SourceCapability =
  | "searchSongs"
  | "searchAlbums"
  | "searchArtists"
  | "searchPlaylists"
  | "getAlbumSongs"
  | "getPlaylistSongs"
  | "getArtistDetail"
  | "getSongById"
  | "getHomeRecommend"
  | "getStream";

export interface MusicSourceManifest {
  id: string;
  name: string;
  version: string;
  capabilities: SourceCapability[];
  priority?: number;
}

export interface MusicSourcePlugin {
  manifest: MusicSourceManifest;

  searchSongs?: (
    keyword: string,
    options?: { signal?: AbortSignal }
  ) => Promise<{ data: SearchSongProps[]; total: number }>;

  searchAlbums?: (
    keyword: string,
    options?: { signal?: AbortSignal }
  ) => Promise<{ data: SearchAlbumsProps[]; total: number }>;

  searchArtists?: (
    keyword: string,
    options?: { signal?: AbortSignal }
  ) => Promise<{ data: SearchArtistProps[]; total: number }>;

  searchPlaylists?: (
    keyword: string,
    options?: { signal?: AbortSignal }
  ) => Promise<{ data: SearchPlaylistProps[]; total: number }>;

  getAlbumSongs?: (
    albumId: string,
    options?: { signal?: AbortSignal }
  ) => Promise<{ data: SearchSongProps[]; total: number }>;

  getPlaylistSongs?: (
    playlistId: string,
    options?: { signal?: AbortSignal; page?: number; limit?: number }
  ) => Promise<{ data: SearchSongProps[]; total: number }>;

  getArtistDetail?: (
    artistId: string,
    options?: { signal?: AbortSignal; page?: number }
  ) => Promise<{
    id: string;
    name: string;
    image: string;
    topSongs: SearchSongProps[];
  } | null>;

  getSongById?: (
    id: string,
    options?: { signal?: AbortSignal }
  ) => Promise<{ data: SearchSongProps[] } | null>;

  getHomeRecommend?: (options?: { signal?: AbortSignal }) => Promise<any>;

  getStream?: (songId: string) => Promise<{ url: string }>;
}


