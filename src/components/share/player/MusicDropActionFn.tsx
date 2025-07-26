import { Song } from "@/entity/interface/song";

import { useSongStore } from "@/store/useSongStore";
import { useCopyToClipboard } from "@/utils/clipboard";


type Props = {
  songInfo: Song;
};

const MusicDropActionFn = ({ songInfo }: Props) => {
  const { defaultSong, setCurrentSong, defaultSongList, setSongList } =
    useSongStore();
  const { copy } = useCopyToClipboard()
  
  const updateSongListFn = ({ type }: { type: "add" | "del" }) => {
    const index = defaultSongList.findIndex((item) => item.id === songInfo.id);

    if (type === "del" && index > -1) {
      // 更新歌曲列表
      const updatedSongList = [
        ...defaultSongList.slice(0, index),
        ...defaultSongList.slice(index + 1),
      ];
      setSongList(updatedSongList);

      // 如果删除的是当前播放的歌曲，选择新的歌曲来播放
      if (defaultSong?.id === songInfo.id) {
        if (updatedSongList.length > 0) {
          // 如果还有剩余歌曲，选择下一首歌曲（如果存在），否则选择最后一首歌曲
          const nextIndex =
            index < updatedSongList.length ? index : updatedSongList.length - 1;
          setCurrentSong(updatedSongList[nextIndex]);
        } else {
          // 如果列表为空，清空当前播放的歌曲
          setCurrentSong(null);
        }
      }
    } else if (type === "add" && index == -1) {
      const currentSongIndex = defaultSongList.findIndex(
        (item) => item.id === defaultSong?.id
      );

      // 如果当前播放歌曲存在于列表中
      if (currentSongIndex !== -1) {
        const updatedSongList = [
          ...defaultSongList.slice(0, currentSongIndex + 1), // 当前歌曲之前的部分和当前歌曲
          songInfo, // 新增的歌曲
          ...defaultSongList.slice(currentSongIndex + 1), // 当前歌曲之后的部分
        ];
        setSongList(updatedSongList);
      } else {
        // 如果当前播放的歌曲不在列表中，则直接添加到列表末尾
        setSongList([...defaultSongList, songInfo]);
      }
      if (defaultSong?.id !== songInfo.id) {
        setCurrentSong(songInfo);
      }
    } else if (type === "add") {
      if (defaultSong?.id !== songInfo.id) {
        // console.log("action render", songInfo);
        setCurrentSong(songInfo);
      }
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(songInfo.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${songInfo.name}.mp3`; // 文件名
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // 清理
    } catch (error) {
      console.error("Download failed", error);
    }
  };
  const copyMusicName = () => {
    copy(songInfo.name, {
      successTitle: "复制成功",
      successDescription: "歌曲名称已复制到剪贴板"
    });
  };
  const shareSong = () => {
    const shareUrl = `${location.origin}/share/song/${songInfo.id}`;
    copy(shareUrl, {
      successTitle: "分享成功",
      successDescription: "歌曲链接已复制到剪贴板"
    });
  }
  return { updateSongListFn, handleDownload, copyMusicName, shareSong };
};

export default MusicDropActionFn;
