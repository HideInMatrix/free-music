import { SearchSongProps } from "@/entity/interface/song";
import StopPropagation from "../share/StopPropagation";
import MusicDropActionFn from "../share/player/MusicDropActionFn";

const RecommendItem = ({ songInfo }: { songInfo: SearchSongProps }) => {
  const { updateSongListFn } = MusicDropActionFn({ songInfo });
  return (
    <StopPropagation
      className="flex flex-col cursor-pointer w-36 min-w-36"
      onClick={() => updateSongListFn({ type: "add" })}>
      <img
        src={songInfo.image}
        alt="cover"
        width={144}
        height={144}
        loading="lazy"
        className="object-cover rounded-sm w-36 min-w-36"
      />
      <h1 className="mt-1 truncate text-lg">{songInfo.name}</h1>
      <div className="truncate text-sm">{songInfo.album.name}</div>
      <div className="truncate text-base">
        {songInfo.artists.map((item) => item.name).join(",")}
      </div>
    </StopPropagation>
  );
};

const PopularRecommend = () => {
  const songs = [
    {
      id: "_omffwy9",
      name: "Take Me Hand",
      artists: [
        {
          id: "1020286",
          name: "Daishi Dance",
          image: [
            "https://c.saavncdn.com/590/Don-t-Leave-Without-Me-English-2012-500x500.jpg",
          ],
        },
      ],
      duration: 259,
      album: {
        id: "19507542",
        name: "Take Me Hand",
      },
      url: "https://aac.saavncdn.com/905/cd9e9025f87d15120cac77986afc7f3c_320.mp4",
      image:
        "https://c.saavncdn.com/905/Take-Me-Hands-English-2020-20200505122820-500x500.jpg",
    },
    {
      id: "bXpkGHLk",
      name: "稻香",
      artists: [
        {
          id: "2144073",
          name: "周杰倫",
          image: [],
        },
      ],
      duration: 223,
      album: {
        id: "50878881",
        name: "魔杰座",
        url: "https://www.jiosaavn.com/album/%e9%ad%94%e6%9d%b0%e5%ba%a7/BdO05Msq5YI_",
      },
      url: "https://aac.saavncdn.com/088/95b9b8969e4700766d3900a0513b206e_320.mp4",
      image:
        "https://c.saavncdn.com/088/UMG_00602458955088-Chinese-2024-20240104053501-500x500.jpg",
    },
    {
      id: "NQyptdOC",
      name: "聽媽媽的話",
      artists: [
        {
          id: "2144073",
          name: "周杰倫",
          image: [],
        },
      ],
      duration: 266,
      album: {
        id: "50878525",
        name: "依然范特西",
        url: "https://www.jiosaavn.com/album/%e4%be%9d%e7%84%b6%e8%8c%83%e7%89%b9%e8%a5%bf/kJTU,SBrhLA_",
      },
      url: "https://aac.saavncdn.com/162/7b2023add5e2938c1ffe013302cf6658_320.mp4",
      image:
        "https://c.saavncdn.com/162/UMG_00602458949162-Chinese-2024-20240104053419-500x500.jpg",
    },
    {
      id: "7xKGaJhd",
      name: "霍元甲",
      artists: [
        {
          id: "2144073",
          name: "周杰倫",
          image: [],
        },
      ],
      album: {
        id: "50879014",
        name: "霍元甲",
        url: "https://www.jiosaavn.com/album/%e9%9c%8d%e5%85%83%e7%94%b2/zqdh9GLK3sw_",
      },
      duration: 278,
      url: "https://aac.saavncdn.com/875/2805aa4e07b846a0244abdb7144b80e0_320.mp4",
      image:
        "https://c.saavncdn.com/875/UMG_00602458948875-Chinese-2024-20240104053439-500x500.jpg",
    },
    {
      id: "UEuvMzCj",
      name: "浪漫手機",
      artists: [
        {
          id: "2144073",
          name: "周杰倫",
          image: [],
        },
      ],
      album: {
        id: "50878933",
        name: "11月的蕭邦",
        url: "https://www.jiosaavn.com/album/11%e6%9c%88%e7%9a%84%e8%95%ad%e9%82%a6/L352us1ImjM_",
      },
      duration: 240,
      url: "https://aac.saavncdn.com/392/1b6f12f420a37f1b4a6b7ac7e5af6c6a_320.mp4",
      image:
        "https://c.saavncdn.com/392/11-Chinese-2024-20240104053449-500x500.jpg",
    },
    {
      id: "zcm5gnFJ",
      name: "Remember Our Summer",
      artists: [
        {
          id: "8503769",
          name: "Frogmonster",
          image: [],
        },
      ],
      duration: 163,
      album: {
        id: "24448762",
        name: "Remember Our Summer",
        url: "https://www.jiosaavn.com/album/remember-our-summer/hoSB0iKGMoc_",
      },
      url: "https://aac.saavncdn.com/076/202d84dd0a880e12c7634903e26f72c9_320.mp4",
      image:
        "https://c.saavncdn.com/076/Remember-Our-Summer-English-2019-20221210133759-500x500.jpg",
    },
  ];
  return (
    <div className="flex flex-col mb-2">
      <h1 className="font-semibold text-2xl mb-2">单曲推荐</h1>
      <div className="flex gap-4 w-full overflow-auto">
        {songs.map((item) => (
          <RecommendItem songInfo={item} key={item.id}></RecommendItem>
        ))}
      </div>
    </div>
  );
};

export default PopularRecommend;
