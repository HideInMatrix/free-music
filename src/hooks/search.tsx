import { useEffect, useState } from "react";
import {
  SearchAlbumsProps,
  SearchArtistProps,
  SearchPlaylistProps,
  SearchSongProps,
} from "@/entity/interface/song";
import { fetchPlaylists } from "@/apis/playlists/jio-savvn";
import { fetchArtists } from "@/apis/artists/jio-savvn";
import { fetchSongs } from "@/apis/songs/jio-savvn";
import { fetchAlbums } from "@/apis/albums/jio-savvn";

export const useFetchSongs = async (value: string, signal: AbortSignal) => {
  let songs: SearchSongProps[] = [];

  try {
    const { data } = await fetchSongs({ value, options: { signal } });
    songs = data;
  } catch (error: any) {
    if (error.name !== "AbortError") {
      console.error("Failed to fetch songs", error);
    }
  }

  return songs;
};

export const useFetchAlbums = async (value: string, signal: AbortSignal) => {
  let albums: SearchAlbumsProps[] = [];
  try {
    const { data } = await fetchAlbums({ value, options: { signal } });
    albums = data;
  } catch (error: any) {
    if (error.name !== "AbortError") {
      console.error("Failed to fetch albums", error);
    }
  }

  return albums;
};

export const useFetchArtists = async (value: string, signal: AbortSignal) => {
  let artists: SearchArtistProps[] = [];

  try {
    const { data } = await fetchArtists({
      value,
      options: { signal },
    });
    artists = data;
  } catch (error: any) {
    if (error.name !== "AbortError") {
      console.error("Failed to fetch artists", error);
    }
  }

  return artists;
};

export const useFetchPlaylists = async (value: string, signal: AbortSignal) => {
  let playlists: SearchPlaylistProps[] = [];

  try {
    const { data } = await fetchPlaylists({ value, options: { signal } });
    playlists = data;
  } catch (error: any) {
    if (error.name !== "AbortError") {
      console.error("Failed to fetch playlists", error);
    }
  }

  return playlists;
};

export function useSearchResult(value: string) {
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
