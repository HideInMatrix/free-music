import { fetchSongById } from "@/apis/songs/jio-savvn";
import { useParams } from "react-router-dom";
import { useSongStore } from "@/store/useSongStore";
import { useEffect } from "react";

export default function ShareSongPage() {
   const params = useParams();
   const songId = params.id || '';
   const { setSongList, setCurrentSong } = useSongStore();



   useEffect(() => {
      fetchSongById({id:songId}).then((song) => {
         if (song && song.data && song.data.length > 0) {
            setSongList([song.data[0]]);
            setCurrentSong(song.data[0]);
         }
      });
      return () => {
      };
   }, [songId]);

   return <div className="flex-1"></div>;
}