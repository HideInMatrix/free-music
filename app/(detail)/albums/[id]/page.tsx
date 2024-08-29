import SongsTable from "@/components/search/SongsTable";

type Props = {
  params: {
    id: string;
  };
};

const AlbumDetailPage = ({ params }: Props) => {
  let albumId = params.id || "0";

  return <SongsTable searchValue={albumId} loaderType="detail"></SongsTable>;
};

export default AlbumDetailPage;
