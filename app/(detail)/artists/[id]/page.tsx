import { fetchArtistsById } from "@/apis/artists/jio-savvn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PageProps = {
  params: {
    id: string;
  };
};
export default async function DetailPage({ params }: PageProps) {
  console.log(params.id);
  const artistsId = params.id || "0";
  const artistInfo = await fetchArtistsById(artistsId);
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Avatar>
          <AvatarImage src={artistInfo?.image} alt="artist savatar" />
          <AvatarFallback>{artistInfo?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="pl-4">
          <h1>{artistInfo?.name}</h1>
          <p></p>
        </div>
      </div>
    </div>
  );
}
