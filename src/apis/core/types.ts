// src/apis/core/types.ts
import { SearchSongProps, SearchAlbumsProps, SearchArtistProps, SearchPlaylistProps } from "@/entity/interface/song"
import { MusicSource } from "@/entity/enum"

export interface SourceCapabilities {
  searchSong: boolean
  searchAlbum: boolean
  searchArtist: boolean
  searchPlaylist: boolean
  getAlbumDetail: boolean
  getPlaylistDetail: boolean
  getStreamUrl: boolean   // 某些音源需要单独换直链
}

export interface SourceProvider {
  id: MusicSource
  displayName: string
  capabilities: SourceCapabilities

  searchSongs?(keyword: string, options?: { signal?: AbortSignal }): Promise<SearchSongProps[]>
  searchAlbums?(keyword: string, options?: { signal?: AbortSignal }): Promise<SearchAlbumsProps[]>
  searchArtists?(keyword: string, options?: { signal?: AbortSignal }): Promise<SearchArtistProps[]>
  searchPlaylists?(keyword: string, options?: { signal?: AbortSignal }): Promise<SearchPlaylistProps[]>

  getAlbumDetail?(albumId: string, options?: { signal?: AbortSignal }): Promise<{ albumInfo: SearchAlbumsProps; songs: SearchSongProps[] }>
  getPlaylistDetail?(playlistId: string, options?: { signal?: AbortSignal }): Promise<SearchSongProps[]>

  getStreamUrl?(songId: string, options?: { signal?: AbortSignal }): Promise<string>  // 可选
}