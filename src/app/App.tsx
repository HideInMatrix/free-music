import PopularAlbums from "@/components/main/PopularAlbums";
import PopularRecommend from "@/components/main/PopularRecommend";
import { Separator } from "@/components/ui/separator";

function App() {
  return (
    <div className="flex-auto flex flex-col p-6">
      <PopularRecommend></PopularRecommend>
      <Separator />
      <PopularAlbums></PopularAlbums>
    </div>
  );
}

export default App;
