import MusicItem from "./MusicItem";
import MusicListInfo from "./MusicListInfo";

type Props = {};

const MusicCurrentList = (props: Props) => {
  const music = [
    {
      name: "珊瑚海",
      url: "https://aac.saavncdn.com/392/def9f6eb56e99c7619d9d46a62ef8b4e_96.mp4",
    },
  ];
  return (
    <div className="h-full w-full">
      <MusicListInfo />
      {music.map((item) => (
        <MusicItem key={item.name} />
      ))}
    </div>
  );
};

export default MusicCurrentList;
