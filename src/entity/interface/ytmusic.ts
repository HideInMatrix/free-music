// 基础缩略图接口
interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

// 艺术家信息接口
interface Artist {
    name: string;
    artistId: string | null;
}

// 专辑信息接口
interface Album {
    name: string;
    albumId: string;
}

// 首页数据接口
export interface HomeData {
    title: string;
    contents: Array<{
        type: string;
        playlistId: string;
        name: string;
        artist: Artist;
        thumbnails: Thumbnail[];
    }>;
}

// 歌曲数据接口
export interface SongData {
    type: 'SONG';
    videoId: string;
    name: string;
    artist: Artist;
    album: Album;
    duration: number;
    thumbnails: Thumbnail[];
}

// 艺术家数据接口
export interface ArtistData {
    type: 'ARTIST';
    artistId: string;
    name: string;
    thumbnails: Thumbnail[];
}

// 专辑数据接口
export interface AlbumData {
    type: 'ALBUM';
    albumId: string;
    playlistId: string;
    name: string;
    artist: Artist;
    year: number;
    thumbnails: Thumbnail[];
    songs?: SongData[];
}

// 播放列表数据接口
export interface PlaylistData {
    type: 'PLAYLIST';
    playlistId: string;
    name: string;
    artist: Artist;
    thumbnails: Thumbnail[];
}
