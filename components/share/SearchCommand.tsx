"use client";
import { Disc2, Music2, User, ListMusic } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { getRequest } from "@/lib/customFetch";
import { debounce } from "@/lib/utils";
import { Song } from "@/entity/interface/song";
import { useSongStore } from "@/store/useSongStore";

export function SearchCommand() {
  const [value, setValue] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Song[]>([]);
  const { defaultSongList, setSongList, defaultSong, setCurrentSong } =
    useSongStore();
  const handleChangeValue = debounce((value: string) => {
    setValue(value);
  }, 230);

  const handleAddSong = (song: Song) => {
    let index = defaultSongList.findIndex(
      (_song) => _song.id === defaultSong.id
    );
    let existSong = defaultSongList.some((_song) => _song.id === song.id);
    if (index > -1 && !existSong) {
      setSongList([
        ...defaultSongList.slice(0, index), // 取出插入点之前的元素
        song, // 插入的新元素
        ...defaultSongList.slice(index), // 取出插入点之后的元素
      ]);
      setCurrentSong(song);
    }
  };

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

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        onValueChange={(value) => handleChangeValue(value)}
        placeholder="输入关键字查询"
      />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {value ? (
          <>
            <CommandGroup heading="歌曲">
              {songs.map((song) => (
                <CommandItem
                  key={song.id}
                  value={song.name + song.id + value}
                  onSelect={() => handleAddSong(song)}>
                  <Music2 className="mr-2 h-4 w-4 shrink-0" />
                  <span>
                    {song.name}
                    {song?.artists
                      ? "--" + song.artists.map((item) => item.name).join(",")
                      : ""}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="专辑">
              {albums.map((album) => (
                <CommandItem
                  key={album.id}
                  value={album.name + album.id + value}>
                  <Disc2 className="mr-2 h-4 w-4" />
                  <span>
                    {album.name}
                    {album?.artists
                      ? "--" + album.artists.map((item) => item.name).join(",")
                      : ""}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="艺术家">
              {artists.map((artist) => (
                <CommandItem key={artist.id} value={artist.name}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{artist.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="播放列表">
              {playlists.map((playlist) => (
                <CommandItem key={playlist.id} value={playlist.name}>
                  <ListMusic className="mr-2 h-4 w-4" />
                  <span>{playlist.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        ) : (
          <></>
        )}
      </CommandList>
    </Command>
  );
}
