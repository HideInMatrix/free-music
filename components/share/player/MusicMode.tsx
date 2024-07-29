"use client";
import { Heart, Menu, Shuffle, RefreshCcw } from "lucide-react";
import { useAudio } from "./AudioProvider";
import { AudioMode } from "@/entity/enum";
// import { useState } from "react";

const MusicMode = () => {
  const modes = ["order", "random", "intro", "circulation"];
  const { playMode, setPlayMode } = useAudio();
  // const [playMode, setPlayMode] = useState("order"); // random intro

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
