import { registerProvider } from "./registry"
import { ytmusicProvider } from "@/apis/ytmusic/provider"
import { jioSavvnProvider } from "@/apis/jio-savvn/provider"


export function setupProviders() {
  registerProvider(ytmusicProvider)
  registerProvider(jioSavvnProvider)
}