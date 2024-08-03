import { Song } from "@/entity/interface/song";
import MusicItem from "./MusicItem";
import MusicListInfo from "./MusicListInfo";

type Props = {};

const MusicCurrentList = (props: Props) => {
  const musicList: Song[] = [
    {
      id: "1",
      name: "珊瑚海",
      artist: [{ id: "1", name: "周杰伦", image: [] }],
      url: "https://aac.saavncdn.com/392/def9f6eb56e99c7619d9d46a62ef8b4e_96.mp4",
    },
    {
      id: "2",
      name: "稻香",
      artist: [{ id: "1", name: "周杰伦", image: [] }],
      url: "https://aac.saavncdn.com/267/fb1143caf67c509b74aadefcbbe0c46d_160.mp4",
    },
  ];

  const handleDeleteSong = (id: string) => {
    console.log("sanchu");
  };
  return (
    <div className="h-full w-full">
      <MusicListInfo />
      {musicList.map((item) => (
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
