import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { loadAllPlugins } from "@/lib/sourceRegistry";
import { useSourceStore } from "@/store/useSourceStore";
import "./globals.css";
import { setupProviders } from "@/apis/core/bootstrap"
setupProviders()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Initialize plugins on startup (non-blocking)
;(async () => {
  try {
    const plugins = await loadAllPlugins();    
    useSourceStore.getState().setPlugins(plugins);
  } catch (e) {
    console.error("Failed to load plugins", e);
  }
})();
