import PopularAlbums from "@/components/main/PopularAlbums";
import PopularRecommend from "@/components/main/PopularRecommend";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

function App() {
  return (
    <div className="flex-auto flex flex-col p-6">
      <Suspense>
        <PopularRecommend></PopularRecommend>
      </Suspense>
      <Separator />
      <Suspense>
        <PopularAlbums></PopularAlbums>
      </Suspense>
    </div>
  );
}

export default App;
