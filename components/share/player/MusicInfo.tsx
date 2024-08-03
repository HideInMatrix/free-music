import { useSongStore } from "@/store/songStoreProvider";
import Image from "next/image";
type Props = {};

const MusicInfo = (props: Props) => {
  const { defaultSong } = useSongStore();
  return (
    <div className="flex overflow-hidden flex-1">
      <div className="items-center max-w-full flex">
        <div className="arco-avatar arco-avatar-square arco-avatar-with-trigger-icon w-16 h-16 rounded-lg mr-4 flex-shrink-0">
          <Image
            src="https://img1.koowo.com/star/starheads/70/58/4/1354235485.jpg"
            alt="avatar"
            width={64}
            height={64}
            className="arco-avatar-image"></Image>
        </div>
        <div className="overflow-hidden flex flex-col">
          <div className="font-bold text-base">{defaultSong.name}</div>
          <div className="text-sm mt-0.5">
            {defaultSong.artist.map((item) => item.name).join("-")}
          </div>
        </div>
      </div>
      <div className="grow hidden lg:block h-1"></div>
    </div>
  );
};

export default MusicInfo;
