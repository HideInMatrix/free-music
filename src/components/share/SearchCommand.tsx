"use client";
import { Disc2, Music2, User, ListMusic, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { startTransition, useCallback, useState } from "react";
import { debounce } from "@/lib/utils";
import { Song } from "@/entity/interface/song";
import { useSongStore } from "@/store/useSongStore";
import { useNavigate } from "react-router-dom";
import { useSearchResult } from "@/hooks/search";

export function SearchCommand() {
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const { songs, albums, artists, playlists } = useSearchResult(keyword);
  const { defaultSongList, setSongList, defaultSong, setCurrentSong } =
    useSongStore();
  const handleChangeValue = debounce((value: string) => {
    setKeyword(value);
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
    handleRouteToSearch("songs");
  };

  const navigate = useNavigate();

  const handleRouteToSearch = useCallback(
    (type: string) => {
      startTransition(() => {
        setOpen(false);
        navigate(`/search/${type}?keyword=${keyword}&type=${type}`);
      });
    },
    [keyword]
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:mr-4 ml-1"
        onClick={() => setOpen(true)}>
        <Search />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          onValueChange={(value) => handleChangeValue(value)}
          placeholder="输入关键字查询"
        />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {keyword ? (
            <>
              <CommandGroup heading="歌曲">
                {songs.map((song) => (
                  <CommandItem
                    key={song.id}
                    value={song.name + song.id + keyword}
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
                    onSelect={() => handleRouteToSearch("albums")}
                    key={album.id}
                    value={album.name + album.id + keyword}>
                    <Disc2 className="mr-2 h-4 w-4" />
                    <span>
                      {album.name}
                      {album?.artists
                        ? "--" +
                          album.artists.map((item) => item.name).join(",")
                        : ""}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="艺术家">
                {artists.map((artist) => (
                  <CommandItem
                    key={artist.id}
                    value={artist.name}
                    onSelect={() => handleRouteToSearch("artists")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{artist.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="播放列表">
                {playlists.map((playlist) => (
                  <CommandItem
                    key={playlist.id}
                    value={playlist.name}
                    onSelect={() => handleRouteToSearch("playlists")}>
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
      </CommandDialog>
    </>
  );
}
