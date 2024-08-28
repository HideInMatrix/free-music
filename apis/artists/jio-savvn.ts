import { getRequest } from "@/lib/customFetch";
const controller = new AbortController();
const { signal } = controller;

export const fetchArtists = async (
  value: string,
  signal: AbortSignal,
  page = 0,
  limit = 5
) => {
  const response = await getRequest(
    `https://saavn.dev/api/search/artists`,
    { query: value, page, limit },
    { signal }
  );

  if (response.success) {
    return response.data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      url: "",
    }));
  }
  return [];
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
