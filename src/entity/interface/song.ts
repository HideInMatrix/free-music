import { MusicSource } from "../enum";

export interface Artist {
  id: string;
  name: string;
  image: string[];
}
export interface Album {
  id: string;
  name: string;
}

export interface Song {
  id?: string;
  artistId?: string;
  name: string;
  artists?: Artist[];
  url: string;
  image?: string;
  duration: number;
  album: Album;
}

export interface SearchSongProps {
  id: string;
  name: string;
  artists: Artist[];
  duration: number;
  album: Album;
  url: string;
  image: string;
  source?: MusicSource      
  sourceId?: string         // 音源内原始ID
  raw?: unknown             // 保留底层Raw数据便于Debug
}

export interface SearchAlbumsProps {
  id: string;
  name: string;
  artists: Artist[];
  playCount: number;
  year: number;
  image: string;
  songs?: Song[];
}

export interface SearchArtistProps {
  id: string;
  name: string;
  image: string;
}

export interface SearchPlaylistProps {
  id: string;
  name: string;
  image: string;
  songCount: number;
  artists?: Artist[];
}