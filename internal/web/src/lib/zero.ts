import { Zero } from '@rocicorp/zero'
import type { WriteTransaction } from '@rocicorp/zero'

// Define our data types
export interface Asset {
  id: string
  name: string
  type: string
  size: number
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// Define mutations
export type M = {
  createAsset: (tx: WriteTransaction, asset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>
  updateAsset: (tx: WriteTransaction, id: string, changes: Partial<Asset>) => Promise<void>
  deleteAsset: (tx: WriteTransaction, id: string) => Promise<void>
}

// Implement mutations
const mutators = {
  createAsset: async (tx: WriteTransaction, asset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    
    await tx.set(`asset/${id}`, {
      ...asset,
      id,
      createdAt: now,
      updatedAt: now,
    })
    
    return id
  },

  updateAsset: async (tx: WriteTransaction, id: string, changes: Partial<Asset>) => {
    const key = `asset/${id}`
    const existing = await tx.get<Asset>(key)
    if (!existing) throw new Error('Asset not found')

    await tx.set(key, {
      ...existing,
      ...changes,
      updatedAt: new Date().toISOString(),
    })
  },

  deleteAsset: async (tx: WriteTransaction, id: string) => {
    await tx.del(`asset/${id}`)
  },
}

// Create Zero instance
export const createZeroClient = () => {
  return new Zero<M>({
    mutators,
    storageKey: 'localhaven-cms',
  })
} 