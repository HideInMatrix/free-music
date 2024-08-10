import { Song } from "@/entity/interface/song";
import { getRequest } from "@/lib/customFetch";
import { useEffect, useState } from "react";

export default function useSearchResult(value: string) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Song[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const [songsRes, albumsRes, artistsRes, playlistsRes] =
          await Promise.all([
            getRequest(
              `https://saavn.dev/api/search/songs`,
              { query: value, page: 0, limit: 5 },
              { signal }
            ),
            getRequest(
              `https://saavn.dev/api/search/albums`,
              { query: value, page: 0, limit: 5 },
              { signal }
            ),
            getRequest(
              `https://saavn.dev/api/search/artists`,
              { query: value, page: 0, limit: 5 },
              { signal }
            ),
            getRequest(
              `https://saavn.dev/api/search/playlists`,
              { query: value, page: 0, limit: 5 },
              { signal }
            ),
          ]);

        if (songsRes.success) {
          setSongs(
            songsRes.data.results.map((item: any) => ({
              id: item.id,
              name: item.name,
              artists: item.artists.primary.map((artist: any) => ({
                id: artist.id,
                name: artist.name,
                image: artist.image,
              })),
              url: item.downloadUrl[item.downloadUrl.length - 1].url,
            }))
          );
        }

        if (albumsRes.success) {
          setAlbums(
            albumsRes.data.results.map((item: any) => ({
              id: item.id,
              name: item.name,
              artists: item.artists.primary.map((artist: any) => ({
                id: artist.id,
                name: artist.name,
                image: artist.image,
              })),
              url: "",
            }))
          );
        }

        if (artistsRes.success) {
          setArtists(
            artistsRes.data.results.map((item: any) => ({
              id: item.id,
              name: item.name,
              url: "",
            }))
          );
        }

        if (playlistsRes.success) {
          setPlaylists(
            playlistsRes.data.results.map((item: any) => ({
              id: item.id,
              name: item.name,
              url: "",
            }))
          );
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Request canceled");
        } else {
          console.error("Request failed", error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); // 组件卸载时取消请求
    };
  }, [value]);
  return { songs, albums, artists, playlists };
}
