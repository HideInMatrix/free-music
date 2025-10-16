import { Home } from "@/components/main/Home";
import { getActivePlugin } from "@/store/useSourceStore";
import { Suspense } from "react";

function App() {
  const controller = new AbortController();
  const { signal } = controller;
  const plugin = getActivePlugin();
  plugin?.searchSongs?.("周杰伦", { signal }).then((result) => {
    console.log(result);
  });
  return (
    <div className="flex-auto flex flex-col p-6">
      <Suspense>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
