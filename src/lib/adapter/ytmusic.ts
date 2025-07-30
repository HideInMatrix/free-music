import { SongData, ArtistData, AlbumData, PlaylistData, VideoData } from "@/entity/interface/ytmusic";
import { SearchSongProps, SearchAlbumsProps, SearchArtistProps, SearchPlaylistProps } from "@/entity/interface/song";

// YTMusic歌曲数据转换为通用歌曲格式
export const adaptYTMusicSong = (song: SongData): SearchSongProps => {
  return {
    id: song.videoId,
    name: song.name,
    artists: [{
      id: song.artist.artistId || '',
      name: song.artist.name,
      image: song.thumbnails.map(t => t.url)
    }],
    duration: song.duration,
    album: {
      id: song.album.albumId,
      name: song.album.name
    },
    url: `https://music.youtube.com/watch?v=${song.videoId}`,
    image: song.thumbnails[0]?.url || ''
  };
};

// YTMusic艺术家数据转换为通用艺术家格式
export const adaptYTMusicArtist = (artist: ArtistData): SearchArtistProps => {
  return {
    id: artist.artistId,
    name: artist.name,
    image: artist.thumbnails[0]?.url || ''
  };
};

// YTMusic专辑数据转换为通用专辑格式
export const adaptYTMusicAlbum = (album: AlbumData): SearchAlbumsProps => {
  return {
    id: album.albumId,
    name: album.name,
    artists: [{
      id: album.artist.artistId || '',
      name: album.artist.name,
      image: album.thumbnails.map(t => t.url)
    }],
    playCount: 0, // YTMusic API 没有提供播放次数
    year: album.year,
    image: album.thumbnails[0]?.url || ''
  };
};

// YTMusic播放列表数据转换为通用播放列表格式
export const adaptYTMusicPlaylist = (playlist: PlaylistData): SearchPlaylistProps => {
  return {
    id: playlist.playlistId,
    name: playlist.name,
    image: playlist.thumbnails[0]?.url || '',
    songCount: 0 // YTMusic API 没有提供歌曲数量
  };
};


export const adapteYTMusicVideo = (video: VideoData): SearchSongProps => {
  return {
    id: video.videoId,
    name: video.name,
    artists: [{
      id: video.artist.artistId || '',
      name: video.artist.name,
      image: video.thumbnails.map(t => t.url)
    }],
    duration: video.duration,
    album: {
      id: '',
      name: ''
    },
    url: `https://music.youtube.com/watch?v=${video.videoId}`,
    image: video.thumbnails[0]?.url || ''
  };
}