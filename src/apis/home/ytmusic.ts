import { AlbumData, ArtistData, HomeData, PlaylistData, SongData } from "@/entity/interface/ytmusic";
import { SearchSongProps, SearchAlbumsProps, SearchArtistProps, SearchPlaylistProps, Song } from "@/entity/interface/song";
import { adaptYTMusicSong, adaptYTMusicArtist, adaptYTMusicAlbum, adaptYTMusicPlaylist } from "@/lib/adapter/ytmusic";
import { getRequest } from "@/lib/customFetch";

const backendURL = import.meta.env.VITE_BACKEND_PRE_URL || '';

// 获取首页推荐数据
export const fetchHomeRecommend = async (options?: { signal: AbortSignal }): Promise<HomeData[]> => {
    const resp = await getRequest(
        `${backendURL}/v1/ytmusic/home`,
        undefined,
        { signal: options?.signal }
    );
    if (resp.code === 0) {
        return resp.data as HomeData[];
    }
    throw new Error('Failed to fetch home recommendations');
}

// 搜索歌曲
export const searchSongs = async (
    keyword: string,
    options?: { signal: AbortSignal }
): Promise<SearchSongProps[]> => {
    
    const resp = await getRequest(
        `${backendURL}/v1/ytmusic/songs`,
        { q: keyword  },
        { signal: options?.signal }
    );
    if (resp.code === 0) {
        return (resp.data as SongData[]).map(adaptYTMusicSong);
    }
    throw new Error('Failed to search songs');
}

// 搜索艺术家
export const searchArtists = async (
    keyword: string,
    options?: { signal: AbortSignal }
): Promise<SearchArtistProps[]> => {
    const resp = await getRequest(
        `${backendURL}/v1/ytmusic/artists`,
        {q: keyword },
        { signal: options?.signal }
    );
    if (resp.code === 0) {
        return (resp.data as ArtistData[]).map(adaptYTMusicArtist);
    }
    throw new Error('Failed to search artists');
}

// 搜索专辑
export const searchAlbums = async (
    keyword: string,
    options?: { signal: AbortSignal }
): Promise<SearchAlbumsProps[]> => {
    const resp = await getRequest(
        `${backendURL}/v1/ytmusic/albums`,
        { q: keyword },
        { signal: options?.signal }
    );
    if (resp.code === 0) {
        return (resp.data as AlbumData[]).map(adaptYTMusicAlbum);
    }
    throw new Error('Failed to search albums');
}

// 搜索播放列表
export const searchPlaylists = async (
    keyword: string,
    options?: { signal: AbortSignal }
): Promise<SearchPlaylistProps[]> => {
    const resp = await getRequest(
        `${backendURL}/v1/ytmusic/playlists`,
        { q: keyword },
        { signal: options?.signal }
    );
    if (resp.code === 0) {
        return (resp.data as PlaylistData[]).map(adaptYTMusicPlaylist);
    }
    throw new Error('Failed to search playlists');
}

// 获取专辑详情(包含歌曲列表)
export const getAlbumsDetailById = async (
    albumId: string,
    options?: { signal: AbortSignal }
): Promise<{
    albumInfo: SearchAlbumsProps;
    songs: SearchSongProps[];
}> => {
    const resp = await getRequest(
        `${backendURL}/v1/ytmusic/album/${albumId}`,
        undefined,
        { signal: options?.signal }
    );
    if (resp.code === 0) {
        const albumData = resp.data as AlbumData;
        return {
            albumInfo: adaptYTMusicAlbum(albumData),
            songs: albumData.songs?.map(adaptYTMusicSong) || []
        };
    }
    throw new Error('Failed to fetch album details');
}