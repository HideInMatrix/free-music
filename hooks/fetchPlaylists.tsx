import {
  fetchPlaylists,
  fetchSongsByPlaylistId,
} from "@/apis/playlists/jio-savvn";
import { SearchPlaylistProps, SearchSongProps } from "@/entity/interface/song";
import { debounce } from "@/lib/utils";

import { Dispatch, SetStateAction, useCallback, useState } from "react";

export const fetchPlaylistsByKeyword = ({
  searchValue,
  page,
  result,
  toEnd,
  setResult,
  setTotal,
}: {
  searchValue: string;
  page: number;
  result: SearchPlaylistProps[];
  toEnd: boolean;
  setResult: Dispatch<SetStateAction<SearchPlaylistProps[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderData = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || toEnd) return; // 如果正在加载，或者已经到达底部，直接返回
      setLoading(true);

      try {
        const { data, total } = await fetchPlaylists({
          value: searchValue,
          page,
          limit: 20,
          options: { signal: signal },
        });
        setTotal(total);

        setResult((preResult) =>
          [...preResult, ...data].reduce((acc, album) => {
            if (!acc.some((s: SearchPlaylistProps) => s.id === album.id)) {
              acc.push(album);
            }
            return acc;
          }, [] as SearchPlaylistProps[])
        );
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
    [page, searchValue, toEnd]
  );
  return { loaderData };
};

export const fetchPlaylistById = ({
  id,
  page,
  result,
  toEnd,
  setResult,
  setTotal,
}: {
  id: string;
  page: number;
  result: SearchSongProps[];
  toEnd: boolean;
  setResult: Dispatch<SetStateAction<SearchSongProps[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderData = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || toEnd) return; // 如果正在加载，或者已经到达底部，直接返回
      setLoading(true);

      try {
        const { data, total } = await fetchSongsByPlaylistId({
          value: id,
          page,
          limit: 20,
          options: { signal: signal },
        });
        setTotal(total);

        setResult((preResult) =>
          [...preResult, ...data].reduce((acc, song) => {
            if (!acc.some((s: SearchSongProps) => s.id === song.id)) {
              acc.push(song);
            }
            return acc;
          }, [] as SearchSongProps[])
        );
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
    [page, id, toEnd]
  );
  return { loaderData };
};
