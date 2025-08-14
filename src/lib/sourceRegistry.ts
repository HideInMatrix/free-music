import { MusicSourcePlugin } from "@/entity/interface/source";

const pluginModules = import.meta.glob("../plugins/*/index.ts", { import: "default" });


export async function loadAllPlugins(): Promise<MusicSourcePlugin[]> {
  const loaded: MusicSourcePlugin[] = [];
  for (const importer of Object.values(pluginModules)) {
    const mod = (await importer()) as MusicSourcePlugin;
    if (mod?.manifest?.id) {
      loaded.push(mod);
    }
  }  
  return loaded.sort((a, b) => (b.manifest.priority ?? 0) - (a.manifest.priority ?? 0));
}

export async function loadPluginById(id: string): Promise<MusicSourcePlugin | null> {
  const plugins = await loadAllPlugins();
  return plugins.find((p) => p.manifest.id === id) ?? null;
}


