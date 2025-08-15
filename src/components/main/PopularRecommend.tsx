import { SearchSongProps } from "@/entity/interface/song";
import StopPropagation from "../share/StopPropagation";
import MusicDropActionFn from "../share/player/MusicDropActionFn";

const RecommendItem = ({ songInfo }: { songInfo: SearchSongProps }) => {
  const { updateSongListFn } = MusicDropActionFn({ songInfo });
  return (
    <StopPropagation
      className="flex flex-col cursor-pointer w-36 min-w-36"
      onClick={() => updateSongListFn({ type: "add" })}>
      <img
        src={songInfo.image}
        alt="cover"
        width={144}
        height={144}
        loading="lazy"
        className="object-cover rounded-sm w-36 min-w-36"
      />
      <h1 className="mt-1 truncate text-lg">{songInfo.name}</h1>
      <div className="truncate text-sm">{songInfo.album.name}</div>
      <div className="truncate text-base">
        {songInfo.artists.map((item) => item.name).join(",")}
      </div>
    </StopPropagation>
  );
};

const PopularRecommend = () => {
  const songs = [] as SearchSongProps[];
  return (
    <div className="flex flex-col mb-2">
      <h1 className="font-semibold text-2xl mb-2">单曲推荐</h1>
      <div className="flex gap-4 w-full overflow-auto">
        {songs.map((item) => (
          <RecommendItem songInfo={item} key={item.id}></RecommendItem>
        ))}
      </div>
    </div>
  );
};

export default PopularRecommend;
