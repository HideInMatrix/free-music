export interface Albums {
  id: string;
  name: string;
  description: string;
  year: null;
  type: string;
  playCount: null;
  language: string;
  explicitContent: true;
  artists: {
    primary: [null];
    featured: [null];
    all: [null];
  };
  url: string;
  image: {
    quality: string;
    url: string;
  }[];
}
