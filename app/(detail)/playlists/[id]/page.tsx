import SongsTable from "@/components/search/SongsTable";

type Props = {
  params: {
    id: string;
  };
};

const PlaylistDetailPage = ({ params }: Props) => {
  let albumId = params.id || "0";

  return <SongsTable searchValue={albumId} loaderType="playlists"></SongsTable>;
};

export default PlaylistDetailPage;
