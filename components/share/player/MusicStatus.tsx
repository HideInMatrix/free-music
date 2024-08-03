"use client";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAudio } from "./AudioProvider";
import { AudioMode } from "@/entity/enum";
import { useSongStore } from "@/store/songStoreProvider";

const MusicStatus = () => {
  // console.log("music status render");

  const [musicStatus, setMusicStatus] = useState(false);
  const { audioRef, playMode } = useAudio();
  const {defaultSong} = useSongStore()

  const handleMusicStatus = useCallback((value: boolean) => {
    setMusicStatus(value);
    value ? audioRef.current?.play() : audioRef.current?.pause();
  }, []);

  useEffect(() => {
    // console.log("music status render useEffect");
    if (audioRef.current) {
      audioRef.current.onended = () => {
        if (playMode == AudioMode.CIRCULATION) {

          // handleMusicStatus(true);
        } else {
          // handleMusicStatus(false);
        }
      };
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.onended = null;
      }
    };
  }, [playMode]);
  return (
    <div
      onClick={() => {
        handleMusicStatus(!musicStatus);
      }}>
      {musicStatus ? (
        <Pause strokeWidth={1} className="w-9 h-9" />
      ) : (
        <Play strokeWidth={1} className="w-9 h-9" />
      )}
    </div>
  );
};

export default MusicStatus;
