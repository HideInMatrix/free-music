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
  getHomeRecommend:boolean // 是否支持获取首页推荐数据
  getArtistDetail: boolean // 是否支持获取艺术家详情
  getArtistSongsById: boolean // 可选，是否支持获取艺术家的所有歌曲
  getArtistAlbumsById: boolean // 可选，是否支持获取艺术家的所有专辑
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

  getHomeRecommend?(options?: { signal?: AbortSignal }): Promise<any[]> // 可选，获取首页推荐数据

  getArtistDetail?(artistId: string, options?: { signal?: AbortSignal }): Promise<any> // 可选，获取艺术家详情

  getArtistSongsById?(artistId: string, options?: { signal?: AbortSignal }): Promise<SearchSongProps[]> // 可选，获取艺术家的所有歌曲
  getArtistAlbumsById?(artistId: string, options?: { signal?: AbortSignal }): Promise<SearchAlbumsProps[]> // 可选，获取艺术家的所有专辑
}