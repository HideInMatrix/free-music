import { MusicSource } from "@/entity/enum"
import type { SourceProvider } from "@/apis/core/types"
import * as api from "./ytmusic"

export const ytmusicProvider: SourceProvider = {
  id: MusicSource.YTMusic,
  displayName: "YouTube Music",
  capabilities: {
    searchSong: true, searchAlbum: true, searchArtist: true, searchPlaylist: true,
    getAlbumDetail: true, getPlaylistDetail: true, getStreamUrl: false, getArtistDetail: true, getHomeRecommend: true,
    getArtistSongsById: true, getArtistAlbumsById: true,
  },
  searchSongs: api.searchSongs,
  searchAlbums: api.searchAlbums,
  searchArtists: api.searchArtists,
  searchPlaylists: api.searchPlaylists,
  getAlbumDetail: api.getAlbumsDetailById,
  getPlaylistDetail: api.getPlaylistDetailById,
  getHomeRecommend: api.fetchHomeRecommend,
  getArtistDetail: api.getArtistDetailById,
  getArtistSongsById: api.getArtistSongsById,
  getArtistAlbumsById: api.getArtistAlbumsById,
}