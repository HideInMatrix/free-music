import { SearchArtistProps } from "@/entity/interface/song";
import { getRequest } from "@/lib/customFetch";
const controller = new AbortController();
const { signal } = controller;

export const fetchArtists = async ({
  value,
  options,
  page = 0,
  limit = 5,
}: {
  value: string;
  options?: { signal?: AbortSignal };
  page?: number;
  limit?: number;
}): Promise<{ data: SearchArtistProps[]; total: number }> => {
  const response = await getRequest(
    `https://saavn.dev/api/search/artists`,
    { query: value, page, limit },
    { signal: options?.signal }
  );

  if (response.success) {
    return {
      data: response.data.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image[item.image.length - 1].url,
        url: "",
      })),
      total: response.data.total,
    };
  }
  return { data: [], total: 0 };
};

export const fetchArtistsById = async (id: string) => {
  const response = await getRequest(`https://saavn.dev/api/artists/${id}`, {
    signal,
  });

  if (response.success) {
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.image[response.data.image.length - 1].url,
      topSongs: response.data.topSongs,
    };
  }
  return null;
};
