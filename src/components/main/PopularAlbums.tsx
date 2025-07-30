import { SearchAlbumsProps } from "@/entity/interface/song";
import { Link } from "react-router-dom";

const PopularAlbumItem = ({ album }: { album: SearchAlbumsProps }) => {
  return (
    <Link
      to={`/albums/${album.id}`}
      className="flex flex-col cursor-pointer w-36 min-w-36">
      <img
        src={album.image}
        alt="cover"
        width={144}
        height={144}
        loading="lazy"
        className="object-cover rounded-sm w-36 min-w-36"
      />
      <h1 className="mt-1 truncate text-lg">{album.name}</h1>
    </Link>
  );
};

const PopularAlbums = () => {
  const albums: SearchAlbumsProps[] = [
  ];
  return (
    <div className="flex flex-col my-2">
      <h1 className="font-semibold text-2xl mb-2">专辑推荐</h1>
      <div className="flex gap-4 w-full overflow-auto">
        {albums.map((item) => (
          <PopularAlbumItem album={item} key={item.id}></PopularAlbumItem>
        ))}
      </div>
    </div>
  );
};

export default PopularAlbums;
