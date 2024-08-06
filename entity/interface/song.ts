export interface Artist {
  id: string;
  name: string;
  image: string[];
}

export interface Song {
  id: string;
  name: string;
  artists?: Artist[];
  url: string;
}
