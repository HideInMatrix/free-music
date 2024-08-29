import { useEffect, useState } from "react";
import {
  SearchAlbumsProps,
  SearchSongProps,
  Song,
} from "@/entity/interface/song";
import { fetchPlaylists } from "@/apis/playlists/jio-savvn";
import { fetchArtists } from "@/apis/artists/jio-savvn";
import { fetchSongs } from "@/apis/songs/jio-savvn";
import { fetchAlbums } from "@/apis/albums/jio-savvn";

const useFetchSongs = (value: string, signal: AbortSignal) => {
  const [songs, setSongs] = useState<SearchSongProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchSongs({ value, options: { signal } });
        setSongs(data);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch songs", error);
        }
      }
    };

    fetchData();
  }, [value]);

  return songs;
};

const useFetchAlbums = (value: string, signal: AbortSignal) => {
  const [albums, setAlbums] = useState<SearchAlbumsProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchAlbums({ value, options: { signal } });
        setAlbums(data);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch albums", error);
        }
      }
    };

    fetchData();
  }, [value]);

  return albums;
};

const useFetchArtists = (value: string, signal: AbortSignal) => {
  const [artists, setArtists] = useState<Song[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchArtists(value, signal);
        setArtists(result);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch artists", error);
        }
      }
    };

    fetchData();
  }, [value]);

  return artists;
};

const useFetchPlaylists = (value: string, signal: AbortSignal) => {
  const [playlists, setPlaylists] = useState<Song[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPlaylists(value, signal);
        setPlaylists(result);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch playlists", error);
        }
      }
    };

    fetchData();
  }, [value]);

  return playlists;
};

export default function useSearchResult(value: string) {
  const controller = new AbortController();
  const { signal } = controller;

  const songs = useFetchSongs(value, signal);
  const albums = useFetchAlbums(value, signal);
  const artists = useFetchArtists(value, signal);
  const playlists = useFetchPlaylists(value, signal);

  useEffect(() => {
    return () => {
      controller.abort(); // 组件卸载时取消请求
    };
  }, []);

  return { songs, albums, artists, playlists };
}
