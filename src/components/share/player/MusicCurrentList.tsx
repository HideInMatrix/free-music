import MusicItem from "./MusicItem";
import MusicListInfo from "./MusicListInfo";
import { useSongStore } from "@/store/useSongStore";

const MusicCurrentList = () => {
  let { defaultSongList } = useSongStore();

  return (
    <div className="h-full w-full">
      <MusicListInfo />
      {defaultSongList.map((item) => (
        <MusicItem songInfo={item} key={item.id} />
      ))}
    </div>
  );
};

export default MusicCurrentList;
