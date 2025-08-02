import { fetchAlbums, fetchAlbumsByArtistIdFn } from "@/apis/jio-savvn/index";
import { SearchAlbumsProps } from "@/entity/interface/song";
import { debounce } from "@/lib/utils";

import { Dispatch, SetStateAction, useCallback, useState } from "react";

export const fetchAlbumsByKeyword = ({
  searchValue,
  page,
  toEnd,
  setResult,
  setTotal,
}: {
  searchValue: string;
  page: number;
  toEnd: boolean;
  setResult: Dispatch<SetStateAction<SearchAlbumsProps[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderData = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || toEnd) return; // 如果正在加载，或者已经到达底部，直接返回
      setLoading(true);

      try {
        const { data, total } = await fetchAlbums({
          value: searchValue,
          page,
          limit: 20,
          options: { signal: signal },
        });
        setTotal(total);

        setResult((preResult) =>
          [...preResult, ...data].reduce((acc, album) => {
            if (!acc.some((s: SearchAlbumsProps) => s.id === album.id)) {
              acc.push(album);
            }
            return acc;
          }, [] as SearchAlbumsProps[])
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

export const fetchAlbumsByArtistId = ({
  id,
  page,
  toEnd,
  setResult,
  setTotal,
}: {
  id: string;
  page: number;
  toEnd: boolean;
  setResult: Dispatch<SetStateAction<SearchAlbumsProps[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
}) => {
  const [loading, setLoading] = useState(false);

  const loaderData = useCallback(
    debounce(async ({ signal }: { signal: AbortSignal }) => {
      if (loading || toEnd) return; // 如果正在加载，或者已经到达底部，直接返回
      setLoading(true);

      try {
        const { data, total } = await fetchAlbumsByArtistIdFn({
          id,
          page,
          options: { signal: signal },
        });
        setTotal(total);

        setResult((preResult) =>
          [...preResult, ...data].reduce((acc, album) => {
            if (!acc.some((s: SearchAlbumsProps) => s.id === album.id)) {
              acc.push(album);
            }
            return acc;
          }, [] as SearchAlbumsProps[])
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
