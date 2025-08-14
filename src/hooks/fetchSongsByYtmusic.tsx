import { getActivePlugin } from "@/store/useSourceStore";
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
        const plugin = getActivePlugin();
        const res = await plugin?.searchSongs?.(searchValue, { signal });
        setResult(res?.data ?? []);
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
        const plugin = getActivePlugin();
        const res = await plugin?.searchArtists?.(searchValue, { signal });
        setResult(res?.data ?? []);
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
        const plugin = getActivePlugin();
        const res = await plugin?.searchAlbums?.(searchValue, { signal });
        setResult(res?.data ?? []);
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
  setLoading
}: {
  searchValue: string;
  setResult: Dispatch<SetStateAction<SearchPlaylistProps[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const loaderPlaylists = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (!searchValue) return;
      setLoading(true);

      try {
        const plugin = getActivePlugin();
        const res = await plugin?.searchPlaylists?.(searchValue, { signal });
        setResult(res?.data ?? []);
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

  return { loaderPlaylists };
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
        const plugin = getActivePlugin();
        const res = await plugin?.getAlbumSongs?.(albumId, { signal });
        setResult(res?.data ?? []);
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

// 获取播放列表详情歌曲列表 Hook
export const fetchPlaylistDetailSongs = ({
  playlistId,
  setResult,
}: {
  playlistId: string;
  setResult: Dispatch<SetStateAction<SearchSongProps[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderPlaylistSongs = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || !playlistId) return;
      setLoading(true);
      try {
        const plugin = getActivePlugin();
        const res = await plugin?.getPlaylistSongs?.(playlistId, { signal });
        setResult(res?.data ?? []);
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
    [playlistId]
  );

  return { loaderPlaylistSongs, loading };
};


