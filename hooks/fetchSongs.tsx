import { fetchSongsByAlbumId } from "@/apis/albums/jio-savvn";
import { fetchSongs } from "@/apis/songs/jio-savvn";
import { SearchSongProps } from "@/entity/interface/song";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

export const fetchSongByKeyword = ({
  searchValue,
  page,
  result,
  toEnd,
  setResult,
  setTotal,
}: {
  searchValue: string;
  page: number;
  result: SearchSongProps[];
  toEnd: boolean;
  setResult: Dispatch<SetStateAction<SearchSongProps[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderSongs = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      if (loading || toEnd) return; // 如果正在加载，或者已经到达底部，直接返回
      setLoading(true);

      try {
        const { data, total } = await fetchSongs({
          value: searchValue,
          page,
          limit: 20,
          options: { signal: signal },
        });
        setTotal(total);
        const mergedResult = [...result, ...data].reduce((acc, song) => {
          if (!acc.some((s: SearchSongProps) => s.id === song.id)) {
            acc.push(song);
          }
          return acc;
        }, [] as SearchSongProps[]);
        setResult(mergedResult);
      } catch (error: unknown) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [page, searchValue]
  );
  return { loaderSongs };
};

export const fetchSongByAlbumId = ({
  albumId,
  page,
  result,
  toEnd,
  setResult,
  setTotal,
}: {
  albumId: string;
  page: number;
  result: SearchSongProps[];
  toEnd: boolean;
  setResult: Dispatch<SetStateAction<SearchSongProps[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderSongs = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      if (loading || toEnd) return; // 如果正在加载，或者已经到达底部，直接返回
      setLoading(true);

      try {
        const { data, total } = await fetchSongsByAlbumId({
          id: albumId,
          options: { signal: signal },
        });
        setTotal(total);
        const mergedResult = [...result, ...data].reduce((acc, song) => {
          if (!acc.some((s: SearchSongProps) => s.id === song.id)) {
            acc.push(song);
          }
          return acc;
        }, [] as SearchSongProps[]);
        setResult(mergedResult);
      } catch (error: unknown) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [page, albumId]
  );
  return { loaderSongs };
};
