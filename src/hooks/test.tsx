import { useEffect, useState } from "react"
import { aggregateSearchSongs } from "@/apis/core/aggregate"
import { ytmusicProvider } from "@/apis/ytmusic/provider"
import { jioSavvnProvider } from "@/apis/jio-savvn/provider"

export function useSearchSongs(keyword: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!keyword) return
    const controller = new AbortController()
    setLoading(true)
    aggregateSearchSongs(keyword, { signal: controller.signal,sources:[ytmusicProvider,jioSavvnProvider] })
      .then(setData)
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [keyword])

  return { data, loading }
}