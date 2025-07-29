import { Menu, Shuffle, RefreshCcw } from "lucide-react";
import { useAudio } from "./AudioProvider";
import { AudioMode } from "@/entity/enum";
import { HTMLProps, useEffect } from "react";
import { useSongStore } from "@/store/useSongStore";
import StopPropagation from "../StopPropagation";
import { getNextEnumValue } from "@/lib/utils";
import { Song } from "@/entity/interface/song";
type MusicModeProps = HTMLProps<HTMLDivElement>;

const MusicMode = ({ ...props }: MusicModeProps) => {
  const {
    defaultSong,
    defaultSongList,
    setCurrentSong,
    defaultMode,
    setMusicMode,
  } = useSongStore();
  const { audioRef, handleMusicStatus, isEnded } = useAudio();
  // console.log("music mode render");

  const getRandomSong = (defaultSongList: unknown[], currentIndex: number) => {
    // 过滤掉当前正在播放的歌曲
    const filteredList = defaultSongList.filter(
      (_, index) => index !== currentIndex
    );

    if (filteredList.length === 0) {
      return null; // 如果过滤后的列表为空，返回 null
    }

    // 从过滤后的列表中随机选择一首歌
    const randomIndex = Math.floor(Math.random() * filteredList.length);
    return filteredList[randomIndex];
  };

  const rendPlayMode = () => {
    let component = <></>;

    switch (defaultMode) {
      case AudioMode.ORDER:
        component = <Menu size={22} />;
        break;
      case AudioMode.RANDOM:
        component = <Shuffle size={22} />;
        break;
      // case AudioMode.INTRO:
      //   component = <Heart />;
      //   break;
      case AudioMode.CIRCULATION:
        component = <RefreshCcw size={22} />;
        break;
      default:
        component = <Menu size={22} />;
        break;
    }
    return component;
  };

  // 处理歌曲结束后的逻辑
  const handleSongEnd = () => {
    const index = defaultSongList.findIndex(
      (item) => item.id == defaultSong?.id
    );

    if (defaultMode == AudioMode.CIRCULATION) {
      if (index !== -1 && index == defaultSongList.length - 1) {
        setCurrentSong(defaultSongList[0]);
      } else if (index !== -1) {
        setCurrentSong(defaultSongList[index + 1]);
      }
    } else if (defaultMode == AudioMode.ORDER) {
      if (index > -1 && index < defaultSongList.length - 1) {
        setCurrentSong(defaultSongList[index + 1]);
      } else {
        handleMusicStatus(false);
      }
    } else if (defaultMode === AudioMode.RANDOM) {
      const randomSong = getRandomSong(defaultSongList, index);
      if (randomSong) {
        setCurrentSong(randomSong as Song);
      } else {
        handleMusicStatus(false);
      }
    } else {
      handleMusicStatus(false);
    }
    handleMusicStatus(true);
  };

  useEffect(() => {
    const player = audioRef.current;

    if (player) {
      handleSongEnd()
    }

  }, [isEnded]);

  const actionPlayMode = () => {
    if (defaultMode === AudioMode.CIRCULATION) {
      setMusicMode(AudioMode.ORDER);
    } else {
      setMusicMode(getNextEnumValue(AudioMode, defaultMode));
    }
  };

  return (
    <>
      <StopPropagation onClick={actionPlayMode} {...props}>
        {rendPlayMode()}
      </StopPropagation>
    </>
  );
};

export default MusicMode;
