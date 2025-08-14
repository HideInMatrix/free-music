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