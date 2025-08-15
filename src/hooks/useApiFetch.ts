import { useEffect, useState } from "react"
import {
    aggregateGetHomeRecommend,
    aggregateSearchSongs,
    aggregateSearchAlbums,
    aggregateGetAlbumDetail,
    aggregateSearchPlaylists,
    aggregateGetArtistDetail,
    aggregateGetSongsByArtist,
    aggregateGetAlbumsByArtist,
    aggregateGetPlaylistDetail,
    aggregateSearchArtists
} from "@/apis/core/aggregate"
import { ytmusicProvider } from "@/apis/ytmusic/provider"
import { jioSavvnProvider } from "@/apis/jio-savvn/provider"

export function useSearchSongs(keyword: string) {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!keyword) return
        const controller = new AbortController()
        setLoading(true)
        aggregateSearchSongs(keyword, { signal: controller.signal, sources: [ytmusicProvider, jioSavvnProvider] })
            .then(setData)
            .finally(() => setLoading(false))
        return () => controller.abort()
    }, [keyword])

    return { data, loading }
}

export function useGetHomeRecommend() {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        aggregateGetHomeRecommend({ signal: controller.signal, sources: [ytmusicProvider] })
            .then(setData)
            .finally(() => setLoading(false))
        // 清理函数，取消请求
        return () => controller.abort()
    }, [])

    return { data, loading }
}

export function useGetAlbums(keyword: string) {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        aggregateSearchAlbums(keyword, { signal: controller.signal, sources: [ytmusicProvider, jioSavvnProvider] })
            .then(setData)
            .finally(() => setLoading(false))
        // 清理函数，取消请求
        return () => controller.abort()
    }, [keyword])

    return { data, loading }
}

export function useGetAlbumsDetail(albumId: string) {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!albumId) return
        const controller = new AbortController()
        setLoading(true)
        aggregateGetAlbumDetail(albumId, { signal: controller.signal, sources: [ytmusicProvider] })
            .then(setData)
            .finally(() => setLoading(false))
        // 清理函数，取消请求
        return () => controller.abort()
    }, [albumId])

    return { data, loading }
}

export function useGetArtisDetail(artistId: string) {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!artistId) return
        const controller = new AbortController()
        setLoading(true)
        aggregateGetArtistDetail(artistId, { signal: controller.signal, sources: [ytmusicProvider] })
            .then(setData)
            .finally(() => setLoading(false))
        // 清理函数，取消请求
        return () => controller.abort()
    }, [artistId])

    return { data, loading }
}

export function useGetArtisSongs(artistId: string) {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        if (!artistId) return
        const controller = new AbortController()
        setLoading(true)
        aggregateGetSongsByArtist(artistId, { signal: controller.signal, sources: [ytmusicProvider] })
            .then(res => {
                setData(res || [])
            })
            .finally(() => setLoading(false))
        // 清理函数，取消请求
        return () => controller.abort()
    }, [artistId])

    return { data, loading }
}

export function useGetArtisAlbums(artistId: string) {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!artistId) return
        const controller = new AbortController()
        setLoading(true)
        aggregateGetAlbumsByArtist(artistId, { signal: controller.signal, sources: [ytmusicProvider] })
            .then(res => {
                setData(res || [])
            })
            .finally(() => setLoading(false))
        // 清理函数，取消请求
        return () => controller.abort()
    }, [artistId])

    return { data, loading }
}

export function useGetPlaylistsByKeyword(keyword: string) {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!keyword) return
        const controller = new AbortController()
        setLoading(true)
        aggregateSearchPlaylists(keyword, { signal: controller.signal, sources: [ytmusicProvider] })
            .then(setData)
            .finally(() => setLoading(false))
        // 清理函数，取消请求
        return () => controller.abort()
    }, [keyword])

    return { data, loading }
}

export function useGetPlaylistDetail(playlistId: string) {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!playlistId) return
        const controller = new AbortController()
        setLoading(true)
        aggregateGetPlaylistDetail(playlistId, { signal: controller.signal, sources: [ytmusicProvider] })
            .then(setData)
            .finally(() => setLoading(false))
        // 清理函数，取消请求
        return () => controller.abort()
    }, [playlistId])

    return { data, loading }
}


export function useGetArtistsByKeyword(keyword: string) {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!keyword) return
        const controller = new AbortController()
        setLoading(true)
        aggregateSearchArtists(keyword, { signal: controller.signal, sources: [ytmusicProvider] })
            .then(setData)
            .finally(() => setLoading(false))
        // 清理函数，取消请求
        return () => controller.abort()
    }, [keyword])

    return { data, loading }
}