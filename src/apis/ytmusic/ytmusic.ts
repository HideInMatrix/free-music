import { AlbumData, ArtistData, HomeData, PlaylistData, SongData } from "@/entity/interface/ytmusic";
import { SearchSongProps, SearchAlbumsProps, SearchArtistProps, SearchPlaylistProps } from "@/entity/interface/song";
import { adaptYTMusicSong, adaptYTMusicArtist, adaptYTMusicAlbum, adaptYTMusicPlaylist, adapteYTMusicVideo } from "@/lib/adapter/ytmusic";
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

// 获取播放列表详情
export const getPlaylistDetailById = async (
  playlistId: string,
  options?: { signal: AbortSignal }
): Promise<SearchSongProps[]> => {
  const resp = await getRequest(
    `${backendURL}/v1/ytmusic/playlist/${playlistId}/videos`,
    undefined,
    { signal: options?.signal }
  );

  if (resp.code === 0) {
    return (resp.data as any[]).map(adapteYTMusicVideo);
  }
  throw new Error('获取播放列表详情失败');
};

// /v1/ytmusic/artist/{id}
export const getArtistDetailById = async (
  artistId: string,
  options?: { signal: AbortSignal }
): Promise<SearchArtistProps> => {
  const resp = await getRequest(
    `${backendURL}/v1/ytmusic/artist/${artistId}`,
    undefined,
    { signal: options?.signal }
  );

  if (resp.code === 0) {
    return adaptYTMusicArtist(resp.data as ArtistData);
  }
  throw new Error('获取艺术家详情失败');
}

// /v1/ytmusic/artist/{id}/songs
export const getArtistSongsById = async (
  artistId: string,
  options?: { signal: AbortSignal }
): Promise<SearchSongProps[]> => {
  const resp = await getRequest(
    `${backendURL}/v1/ytmusic/artist/${artistId}/songs`,
    undefined,
    { signal: options?.signal }
  );

  if (resp.code === 0) {
    return (resp.data as SongData[]).map(adaptYTMusicSong);
  }
  throw new Error('获取艺术家歌曲失败');
}

// /v1/ytmusic/artist/{id}/albums
export const getArtistAlbumsById = async (
  artistId: string,
  options?: { signal: AbortSignal }
): Promise<SearchAlbumsProps[]> => {
  const resp = await getRequest(
    `${backendURL}/v1/ytmusic/artist/${artistId}/albums`,
    undefined,
    { signal: options?.signal }
  );

  if (resp.code === 0) {
    return (resp.data as AlbumData[]).map(adaptYTMusicAlbum);
  }
  throw new Error('获取艺术家专辑失败');
}