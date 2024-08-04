"use client";
import { StepBack, StepForward } from "lucide-react";

import MusicStatus from "./MusicStatus";
import MusicProcess from "./MusicProcess";
import { Song } from "@/entity/interface/song";
import { useCallback, useEffect } from "react";
import { useSongStore } from "@/store/songStoreProvider";

const MusicPlayAction = () => {
  // console.log("MusicPlayAction render");
  const { setSongList, setCurrentSong, defaultSong, defaultSongList } =
    useSongStore();
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
      url: "https://aac.saavncdn.com/088/95b9b8969e4700766d3900a0513b206e_96.mp4",
    },
    {
      id: "3",
      name: "听妈妈的话",
      artist: [{ id: "1", name: "周杰伦", image: [] }],
      url: "https://aac.saavncdn.com/162/7b2023add5e2938c1ffe013302cf6658_160.mp4",
    },
  ];

  useEffect(() => {
    setSongList(musicList);
  }, []);

  const handlePreSong = useCallback(() => {
    let index = defaultSongList.findIndex((item) => item.id == defaultSong.id);
    if (index > -1) {
      if (index === 0) {
        setCurrentSong(defaultSongList[defaultSongList.length - 1]);
      } else {
        setCurrentSong(defaultSongList[index - 1]);
      }
    }
  }, [defaultSongList, defaultSong]);

  const handleNexSong = useCallback(() => {
    let index = defaultSongList.findIndex((item) => item.id == defaultSong.id);
    if (index > -1) {
      if (index === defaultSongList.length - 1) {
        setCurrentSong(defaultSongList[0]);
      } else {
        setCurrentSong(defaultSongList[index + 1]);
      }
    }
  }, [defaultSongList, defaultSong]);

  return (
    <div className="flex flex-col flex-[0_0_37.5%] w-[37.5%] lg:flex-auto px-[6px] h-full justify-evenly">
      <div className="flex items-center justify-center">
        <StepBack strokeWidth={1} className="w-9 h-9" onClick={handlePreSong} />
        <MusicStatus />
        <StepForward
          strokeWidth={1}
          className="w-9 h-9"
          onClick={handleNexSong}
        />
      </div>
      <MusicProcess />
    </div>
  );
};

export default MusicPlayAction;
