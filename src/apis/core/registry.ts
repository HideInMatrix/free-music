import { MusicSource } from "@/entity/enum"
import type { SourceProvider } from "./types"

const registry = new Map<MusicSource, SourceProvider>()

export function registerProvider(provider: SourceProvider) {
  registry.set(provider.id, provider)
}

export function getProvider(id: MusicSource): SourceProvider | undefined {
  return registry.get(id)
}

export function getAllProviders(): SourceProvider[] {
  return Array.from(registry.values())
}