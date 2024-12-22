import { writable } from 'svelte/store'
import type { Asset } from '../lib/zero'
import { createZeroClient } from '../lib/zero'

export const createAssetStore = () => {
  const { subscribe, set, update } = writable<Asset[]>([])
  const zero = createZeroClient()

  // Subscribe to asset changes
  zero.subscribe(
    tx => tx.scan({ prefix: 'asset/' }).values().toArray(),
    assets => set(assets as Asset[])
  )

  return {
    subscribe,
    
    async create(asset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) {
      return await zero.mutate.createAsset(asset)
    },

    async update(id: string, changes: Partial<Asset>) {
      await zero.mutate.updateAsset(id, changes)
    },

    async delete(id: string) {
      await zero.mutate.deleteAsset(id)
    },

    // Query helpers
    async getById(id: string) {
      return await zero.read(tx => tx.get<Asset>(`asset/${id}`))
    },

    async getByType(type: string) {
      return await zero.read(async tx => {
        const assets = await tx.scan<Asset>({ prefix: 'asset/' }).values().toArray()
        return assets.filter(a => a.type === type)
      })
    }
  }
}

// Create a singleton instance
export const assetStore = createAssetStore() 