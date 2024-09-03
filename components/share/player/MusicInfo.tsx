import { useSongStore } from "@/store/useSongStore";
import Image from "next/image";
import { useAudio } from "./AudioProvider";
import { useEffect } from "react";

const MusicInfo = () => {
  // console.log("music info render");

  const { defaultSong } = useSongStore();
  const { audioRef } = useAudio();
  useEffect(() => {
    // 动态设置title标签的内容
    const metaDescription = document.querySelector("title");
    if (metaDescription) {
      metaDescription.innerHTML = `${defaultSong.name} | 音乐地带`;
    } else {
      // 如果title标签不存在，则创建一个新的
      const newMetaDescription = document.createElement("title");
      newMetaDescription.innerHTML = `${defaultSong.name} | 音乐地带`;
      document.head.appendChild(newMetaDescription);
    }
  }, [defaultSong.name]); // 空数组作为依赖项，确保只在组件挂载时执行一次
  return (
    <div className="flex overflow-hidden flex-auto">
      <div className="items-center max-w-full flex">
        <div className="arco-avatar arco-avatar-square arco-avatar-with-trigger-icon w-16 h-16 rounded-lg mr-4 flex-shrink-0">
          <Image
            src={defaultSong.image}
            alt="avatar"
            width={64}
            height={64}
            className="arco-avatar-image"></Image>
        </div>
        <div className="overflow-hidden flex flex-col w-40">
          <div className="font-bold text-base truncate">{defaultSong.name}</div>
          <div className="text-sm mt-0.5">
            {defaultSong.artists?.map((item) => item.name).join("-")}
          </div>
        </div>
      </div>
      <div className="grow hidden lg:block w-0 h-0">
        <audio className="hidden" ref={audioRef}></audio>
      </div>
    </div>
  );
};

export default MusicInfo;
