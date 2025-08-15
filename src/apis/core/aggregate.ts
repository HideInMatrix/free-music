import { getAllProviders } from "./registry"
import type { SourceProvider } from "./types"

export async function aggregateSearchSongs(keyword: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.searchSong && p.searchSongs)
  const settled = await Promise.allSettled(
    sources.map(p => p.searchSongs!(keyword, { signal: opts?.signal }).then(list =>
      list.map(item => ({ ...item, source: p.id, sourceId: item.sourceId || item.id }))
    ))
  )
  // 合并、去重（按 name+artists 或 sourceId 策略）、截断
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}

export async function aggregateSearchAlbums(keyword: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.searchAlbum && p.searchAlbums)
  const settled = await Promise.allSettled(
    sources.map(p => p.searchAlbums!(keyword, { signal: opts?.signal }).then(list =>
      list.map(item => ({ ...item, source: p.id, sourceId: item.id }))
    ))
  )
  // 合并、去重（按 name+artists 或 sourceId 策略）、截断
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}

export async function aggregateSearchArtists(keyword: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.searchArtist && p.searchArtists)
  const settled = await Promise.allSettled(
    sources.map(p => p.searchArtists!(keyword, { signal: opts?.signal }).then(list =>
      list.map(item => ({ ...item, source: p.id, sourceId: item.id }))
    ))
  )
  // 合并、去重（按 name+artists 或 sourceId 策略）、截断
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}

export async function aggregateSearchPlaylists(keyword: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.searchPlaylist && p.searchPlaylists)
  const settled = await Promise.allSettled(
    sources.map(p => p.searchPlaylists!(keyword, { signal: opts?.signal }).then(list =>
      list.map(item => ({ ...item, source: p.id, sourceId: item.id, artists: item.artists || [] }))
    ))
  )
  // 合并、去重（按 name+artists 或 sourceId 策略）、截断
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}

export async function aggregateGetHomeRecommend(opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.getHomeRecommend && p.getHomeRecommend)
  const settled = await Promise.allSettled(
    sources.map(p => p.getHomeRecommend!({signal:opts?.signal}).then(list =>
      list.map(item => ({ ...item, source: p.id }))
    ))
  )
  // 合并、去重（按 sourceId 策略）
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}

export async function aggregateGetAlbumDetail(albumId: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.getAlbumDetail && p.getAlbumDetail)
  const settled = await Promise.allSettled(
    sources.map(p => p.getAlbumDetail!(albumId, { signal: opts?.signal }).then(res => res.songs.map(song => ({ ...song, source: p.id, sourceId: song.id }))))
  )
  // 合并、去重（按 name+artists 或 sourceId 策略）
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}

export async function aggregateGetPlaylistDetail(playlistId: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.getPlaylistDetail && p.getPlaylistDetail)
  const settled = await Promise.allSettled(
    sources.map(p => p.getPlaylistDetail!(playlistId, { signal: opts?.signal }).then(songs =>
      songs.map(song => ({ ...song, source: p.id, sourceId: song.id }))
    ))
  )
  // 合并、去重（按 name+artists 或 sourceId 策略）
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}

export async function aggregateGetStreamUrl(songId: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.getStreamUrl && p.getStreamUrl)
  const settled = await Promise.allSettled(
    sources.map(p => p.getStreamUrl!(songId, { signal: opts?.signal }).then(url => ({ url, source: p.id })))
  )
  // 合并、去重（按 sourceId 策略）
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}

export async function aggregateGetArtistDetail(artistId: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.getArtistDetail && p.getArtistDetail)
  const settled = await Promise.allSettled(
    sources.map(p => p.getArtistDetail!(artistId, { signal: opts?.signal }).then(detail => ({
      ...detail,
      source: p.id
    })))
  )
  // 合并、去重（按 sourceId 策略）
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results[0] || null // 返回第一个成功的结果，或 null
}

export async function aggregateGetSongsByArtist(artistId: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.searchSong && p.getArtistSongsById)
  const settled = await Promise.allSettled(
    sources.map(p => p.getArtistSongsById!(artistId, { signal: opts?.signal }).then(list =>
      list.map(item => ({ ...item, source: p.id, sourceId: item.id }))
    ))
  )
  // 合并、去重（按 name+artists 或 sourceId 策略）、截断
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}

export async function aggregateGetAlbumsByArtist(artistId: string, opts?: { sources?: SourceProvider[], signal?: AbortSignal }) {
  const sources = opts?.sources || getAllProviders().filter(p => p.capabilities.getArtistAlbumsById && p.getArtistAlbumsById)
  const settled = await Promise.allSettled(
    sources.map(p => p.getArtistAlbumsById!(artistId, { signal: opts?.signal }).then(albums =>
      albums.map(album => ({ ...album, source: p.id, sourceId: album.id }))
    ))
  )
  // 合并、去重（按 name+artists 或 sourceId 策略）
  const results = settled.flatMap(s => s.status === "fulfilled" ? s.value : [])
  return results
}
