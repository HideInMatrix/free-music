import { fetchArtists } from "@/apis/artists/jio-savvn";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  searchParams: { value: string };
};
export default async function ArtistsPage({ searchParams }: PageProps) {
  const controller = new AbortController();
  const { signal } = controller;
  const artists = await fetchArtists(searchParams.value || "", signal, 0, 40);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {artists.map(
        (item: {
          id: string;
          name: string;
          image: {
            quality: string;
            url: string;
          }[];
          url: string;
        }) => (
          <Link
            href={`/artists/${item.id}`}
            className="w-38 cursor-pointer"
            key={item.id}>
            <Image
              width={150}
              height={200}
              className="rounded-full"
              src={item.image[0].url}
              alt="cover"
              quality={+item.image[0].quality}></Image>
            <p className="text-center mt-1.5" title="artists name">
              {item.name}
            </p>
          </Link>
        )
      )}
    </div>
  );
}
