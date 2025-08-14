import { MusicSourcePlugin } from "@/entity/interface/source";
import {
  searchSongs,
  searchArtists,
  searchAlbums,
  searchPlaylists,
  getAlbumsDetailById,
  getPlaylistDetailById,
  fetchHomeRecommend,
} from "@/apis/ytmusic/ytmusic";

const plugin: MusicSourcePlugin = {
  manifest: {
    id: "ytmusic",
    name: "YouTube Music",
    version: "1.0.0",
    capabilities: [
      "searchSongs",
      "searchAlbums",
      "searchArtists",
      "searchPlaylists",
      "getHomeRecommend",
      "getAlbumSongs",
      "getPlaylistSongs",
    ],
    priority: 90,
  },
  async searchSongs(keyword, options) {
    const data = await searchSongs(keyword, { signal: options?.signal as AbortSignal });
    return { data, total: data.length };
  },
  async searchAlbums(keyword, options) {
    const data = await searchAlbums(keyword, { signal: options?.signal as AbortSignal });
    return { data, total: data.length };
  },
  async searchArtists(keyword, options) {
    const data = await searchArtists(keyword, { signal: options?.signal as AbortSignal });
    return { data, total: data.length };
  },
  async searchPlaylists(keyword, options) {
    const data = await searchPlaylists(keyword, { signal: options?.signal as AbortSignal });
    return { data, total: data.length };
  },
  async getAlbumSongs(albumId, options) {
    const { songs } = await getAlbumsDetailById(albumId, { signal: options?.signal as AbortSignal });
    return { data: songs, total: songs.length };
  },
  async getPlaylistSongs(playlistId, options) {
    const songs = await getPlaylistDetailById(playlistId, { signal: options?.signal as AbortSignal });
    return { data: songs, total: songs.length };
  },
  async getHomeRecommend(options) {
    return await fetchHomeRecommend({ signal: options?.signal as AbortSignal });
  },
};

export default plugin;


