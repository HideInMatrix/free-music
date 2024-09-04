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
  id: string;
  name: string;
  artists?: Artist[];
  url: string;
  image: string;
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
}

export interface SearchAlbumsProps {
  id: string;
  name: string;
  artists: Artist[];
  playCount: number;
  year: number;
}

export interface SearchArtistProps {
  id: string;
  name: string;
  image: string;
}

export interface SearchPlaylistProps{
  id:string;
  name:string;
  image:string;
  songCount:number;
}