
import { Home } from "@/components/main/Home";
import { Suspense } from "react";

function App() {

  return (
    <div className="flex-auto flex flex-col p-6">
      <Suspense>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
