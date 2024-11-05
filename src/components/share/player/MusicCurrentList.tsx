import { useEffect, useState } from "react";
import MusicItem from "./MusicItem";
import MusicListInfo from "./MusicListInfo";
import { useSongStore } from "@/store/useSongStore";
import { ReactSortable } from "react-sortablejs";
import { Song } from "@/entity/interface/song";

/**
 * 音乐当前列表组件
 */
const MusicCurrentList = () => {
  const { defaultSongList, setSongList } = useSongStore();
  const [state, setState] = useState<Song[]>(defaultSongList);

  /**
   * 设置音乐列表
   * @param value - 新的音乐列表
   */
  const handleSetList = (value: Song[]) => {
    setState(value);
    setSongList(value);
  };

  useEffect(() => {
    setState(defaultSongList);
  }, [defaultSongList]);

  return (
    <div className="h-full flex flex-col">
      <MusicListInfo />
      <div className="flex-auto overflow-y-auto no-scrollbar">
        <ReactSortable
          list={state}
          setList={handleSetList}
          scroll={true}
          delayOnTouchOnly
          animation={200}
          delay={400}>
          {state.map((item) => (
            <MusicItem songInfo={item} key={item.id} />
          ))}
        </ReactSortable>
        {/* {defaultSongList.map((item) => (
          <MusicItem songInfo={item} key={item.id} />
        ))} */}
      </div>
    </div>
  );
};

export default MusicCurrentList;
