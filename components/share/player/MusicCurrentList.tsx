
import MusicItem from "./MusicItem";
import MusicListInfo from "./MusicListInfo";
import { useSongStore } from "@/store/useSongStore";


type Props = {};

const MusicCurrentList = (props: Props) => {
  let { defaultSongList } = useSongStore();


  const handleDeleteSong = (id: string) => {
    console.log("sanchu");
  };
  return (
    <div className="h-full w-full">
      <MusicListInfo />
      {defaultSongList.map((item) => (
        <MusicItem
          onDeleted={handleDeleteSong}
          songInfo={item}
          key={item.name}
        />
      ))}
    </div>
  );
};

export default MusicCurrentList;
