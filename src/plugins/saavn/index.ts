import { MusicSourcePlugin } from "@/entity/interface/source";
import {
  fetchAlbums,
  fetchArtists,
  fetchPlaylists,
  fetchSongs,
  fetchSongsByAlbumId,
  fetchSongsByPlaylistId,
  fetchArtistsById,
} from "@/apis/jio-savvn/index";

const plugin: MusicSourcePlugin = {
  manifest: {
    id: "saavn",
    name: "JioSaavn",
    version: "1.0.0",
    capabilities: [
      "searchSongs",
      "searchAlbums",
      "searchArtists",
      "searchPlaylists",
      "getAlbumSongs",
      "getPlaylistSongs",
      "getArtistDetail",
      "getSongById",
    ],
    priority: 80,
  },
  async searchSongs(keyword, options) {
    const { data, total } = await fetchSongs({ value: keyword, options: { signal: options?.signal as AbortSignal }, page: 0, limit: 20 });
    return { data, total };
  },
  async searchAlbums(keyword, options) {
    const { data, total } = await fetchAlbums({ value: keyword, options: { signal: options?.signal as AbortSignal }, page: 0, limit: 20 });
    return { data, total };
  },
  async searchArtists(keyword, options) {
    const { data, total } = await fetchArtists({ value: keyword, options: { signal: options?.signal as AbortSignal }, page: 0, limit: 20 });
    return { data, total };
  },
  async searchPlaylists(keyword, options) {
    const { data, total } = await fetchPlaylists({ value: keyword, options: { signal: options?.signal as AbortSignal }, page: 0, limit: 20 });
    return { data, total };
  },
  async getAlbumSongs(albumId, options) {
    const { data, total } = await fetchSongsByAlbumId({ id: albumId, options: { signal: options?.signal as AbortSignal } });
    return { data, total };
  },
  async getPlaylistSongs(playlistId, options) {
    const { data, total } = await fetchSongsByPlaylistId({ value: playlistId, options: { signal: options?.signal as AbortSignal }, page: 0, limit: 20 });
    return { data, total };
  },
  async getArtistDetail(artistId, options) {
    return await fetchArtistsById({ id: artistId, options: { signal: options?.signal as AbortSignal } });
  },
};

export default plugin;


