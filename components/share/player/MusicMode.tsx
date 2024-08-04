"use client";
import { Heart, Menu, Shuffle, RefreshCcw } from "lucide-react";
import { useAudio } from "./AudioProvider";
import { AudioMode } from "@/entity/enum";
import { useEffect } from "react";
import { useSongStore } from "@/store/songStoreProvider";
// import { useState } from "react";

const MusicMode = () => {
  const modes = ["order", "random", "intro", "circulation"];
  const { defaultSong, defaultSongList, setCurrentSong } = useSongStore();
  const { playMode, setPlayMode, audioRef, handleMusicStatus } = useAudio();

  const getRandomSong = (defaultSongList: any[], currentIndex: number) => {
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

    switch (playMode) {
      case AudioMode.ORDER:
        component = <Menu />;
        break;
      case AudioMode.RANDOM:
        component = <Shuffle />;
        break;
      case AudioMode.INTRO:
        component = <Heart />;
        break;
      case AudioMode.CIRCULATION:
        component = <RefreshCcw />;
        break;
      default:
        component = <Menu />;
        break;
    }
    return component;
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        let index = defaultSongList.findIndex(
          (item) => item.id == defaultSong.id
        );
        if (playMode == AudioMode.CIRCULATION) {
          if (index !== -1) {
            index == defaultSongList.length
              ? setCurrentSong(defaultSongList[0])
              : setCurrentSong(defaultSongList[index + 1]);
          }
        } else if (playMode == AudioMode.ORDER) {
          if (index !== -1 && index <= defaultSongList.length - 1) {
            setCurrentSong(defaultSongList[index + 1]);
          } else {
            handleMusicStatus(false);
          }
        } else if (playMode === AudioMode.RANDOM) {
          const randomSong = getRandomSong(defaultSongList, index);
          setCurrentSong(randomSong);
        } else {
          handleMusicStatus(false);
        }
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.onended = null;
      }
    };
  }, [playMode, defaultSongList, defaultSong]);

  const actionPlayMode = () => {
    if (playMode === AudioMode.CIRCULATION) {
      setPlayMode(AudioMode.ORDER);
    } else {
      setPlayMode(modes[modes.indexOf(playMode) + 1]);
    }
  };

  return <div onClick={actionPlayMode}>{rendPlayMode()}</div>;
};

export default MusicMode;
