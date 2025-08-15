import { MusicSource } from "@/entity/enum"
import type { SourceProvider } from "@/apis/core/types"
import * as api from "./index"

export const jioSavvnProvider:SourceProvider = {
    id: MusicSource.JioSaavn,
    displayName: "JioSaavn",
    capabilities: {
        searchSong: true, searchAlbum: true, searchArtist: true, searchPlaylist: true,
        getAlbumDetail: true, getPlaylistDetail: true, getStreamUrl: false,getHomeRecommend:false,
        getArtistDetail:false,
        getArtistAlbumsById:true,
        getArtistSongsById:true,
      },
      searchSongs: api.searchSongs,
      searchAlbums: api.searchAlbums,
      searchArtists: api.searchArtists,
      searchPlaylists: api.searchPlaylists,
      getAlbumDetail: api.getAlbumDetail,
      getPlaylistDetail: api.getPlaylistDetail,
      getArtistDetail: api.getArtistDetail,
      getArtistAlbumsById: api.getArtistAlbumsById,
      getArtistSongsById: api.getArtistSongsById,
}