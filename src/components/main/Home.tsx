import { Separator } from "@/components/ui/separator"
import { HomeData } from "@/entity/interface/ytmusic";
import { fetchHomeRecommend } from "@/apis/home/ytmusic";
import { useState, useEffect } from "react";
import { Loading } from "../loading";
import { useNavigate } from "react-router-dom";
import { useSongStore } from "@/store/useSongStore";

export function Home() {
    const [data, setData] = useState<HomeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
     const { setCurrentSong } = useSongStore();


    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchHomeRecommend();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : '加载失败');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <Loading visible={loading} message="MicroMatrix" />;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!data.length) return <div className="text-center">暂无数据</div>;

    const handleDetailClick = (item: {type:string;[key:string]:any}) => {
        // 处理点击事件，例如导航到详情页
        console.log("Clicked item:", item);
        if(item.type === "ALBUM"){
            navigate(`/albums/${item.albumId}`)
        }else if(item.type === "PLAYLIST"){
            navigate(`/playlists/${item.playlistId}`)
        }else if(item.type === "SONG"){
            setCurrentSong({name:item.name,url:item.videoId,album:item.album,duration:item.duration,image:item.thumbnails[item.thumbnails.length - 1].url});
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {data.map((section, index) => (
                <div key={index} className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {section.contents.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-2" onClick={() => handleDetailClick(item)}>
                                <div className="aspect-square relative overflow-hidden rounded-md">
                                    {
                                        item?.thumbnails.length > 0 ?
                                            <img
                                                src={item.thumbnails[item.thumbnails.length - 1].url}
                                                alt={item.name}
                                                width={item.thumbnails[item.thumbnails.length - 1].width}
                                                height={item.thumbnails[item.thumbnails.length - 1].height}
                                                loading="lazy"
                                                className="object-cover w-full h-full hover:scale-105 transition-all"
                                            />
                                            : <div className=" w-full h-full hover:scale-105 transition-all"></div>
                                    }
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-medium leading-none truncate">{item?.name}</h3>
                                    <p className="text-sm text-muted-foreground truncate">{item?.artist?.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {index < data.length - 1 && <Separator className="mt-6" />}
                </div>
            ))}
        </div>
    );
}