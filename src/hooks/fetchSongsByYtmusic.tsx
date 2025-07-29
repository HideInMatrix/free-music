import { searchSongs, searchArtists, searchAlbums, searchPlaylists, getAlbumsDetailById } from "@/apis/home/ytmusic";
import { SearchSongProps, SearchArtistProps, SearchAlbumsProps, SearchPlaylistProps } from "@/entity/interface/song";
import { debounce } from "@/lib/utils";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

// 搜索歌曲 Hook
export const fetchSongsByKeyword = ({
  searchValue,
  setResult,
}: {
  searchValue: string;
  setResult: Dispatch<SetStateAction<SearchSongProps[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderSongs = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || !searchValue) return;
      setLoading(true);

      try {
        const data = await searchSongs(searchValue, { signal });
        setResult(data);
      } catch (error: unknown) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 250),
    [searchValue]
  );

  return { loaderSongs, loading };
};

// 搜索艺术家 Hook
export const fetchArtistsByKeyword = ({
  searchValue,
  setResult,
}: {
  searchValue: string;
  setResult: Dispatch<SetStateAction<SearchArtistProps[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderArtists = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || !searchValue) return;
      setLoading(true);

      try {
        const data = await searchArtists(searchValue, { signal });
        setResult(data);
      } catch (error: unknown) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 250),
    [searchValue]
  );

  return { loaderArtists, loading };
};

// 搜索专辑 Hook
export const fetchAlbumsByKeyword = ({
  searchValue,
  setResult,
}: {
  searchValue: string;
  setResult: Dispatch<SetStateAction<SearchAlbumsProps[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderAlbums = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || !searchValue) return;
      setLoading(true);

      try {
        const data = await searchAlbums(searchValue, { signal });
        setResult(data);
      } catch (error: unknown) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 250),
    [searchValue]
  );

  return { loaderAlbums, loading };
};

// 搜索播放列表 Hook
export const fetchPlaylistsByKeyword = ({
  searchValue,
  setResult,
}: {
  searchValue: string;
  setResult: Dispatch<SetStateAction<SearchPlaylistProps[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderPlaylists = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || !searchValue) return;
      setLoading(true);

      try {
        const data = await searchPlaylists(searchValue, { signal });
        setResult(data);
      } catch (error: unknown) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 250),
    [searchValue]
  );

  return { loaderPlaylists, loading };
};

// 获取专辑详情歌曲列表 Hook
export const fetchAlbumDetailSongs = ({
  albumId,
  setResult,
}: {
  albumId: string;
  setResult: Dispatch<SetStateAction<SearchSongProps[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderAlbumSongs = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || !albumId) return;
      setLoading(true);

      try {
        const { songs } = await getAlbumsDetailById(albumId, { signal });
        setResult(songs);
      } catch (error: unknown) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 250),
    [albumId]
  );

  return { loaderAlbumSongs, loading };
};

