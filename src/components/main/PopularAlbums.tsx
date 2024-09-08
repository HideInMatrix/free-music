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
        className="object-cover rounded-sm w-36 min-w-36"
      />
      <h1 className="mt-1 truncate text-lg">{album.name}</h1>
    </Link>
  );
};

const PopularAlbums = () => {
  const albums: SearchAlbumsProps[] = [
    {
      id: "50878881",
      name: "魔杰座",
      artists: [{ name: "周杰倫", id: "2144073", image: [] }],
      playCount: 0,
      year: 2024,
      image:
        "https://c.saavncdn.com/088/UMG_00602458955088-Chinese-2024-20240104053501-500x500.jpg",
    },
    {
      id: "50878880",
      name: "我很忙",
      artists: [{ name: "周杰倫", id: "2144073", image: [] }],
      playCount: 0,
      year: 2024,
      image:
        "https://c.saavncdn.com/070/UMG_00602458952070-Chinese-2024-20240104053447-500x500.jpg",
    },
  ];
  return (
    <div className="flex flex-col my-2">
      <h1 className="font-semibold text-2xl mb-2">专辑推荐</h1>
      <div className="flex gap-4 w-full overflow-auto">
        {albums.map((item) => (
          <PopularAlbumItem album={item}></PopularAlbumItem>
        ))}
      </div>
    </div>
  );
};

export default PopularAlbums;
