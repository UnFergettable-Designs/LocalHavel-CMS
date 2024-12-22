import { Zero } from '@rocicorp/zero'
import type { WriteTransaction } from '@rocicorp/zero'
import type { User, Session, LoginCredentials, AuthError } from './types'

// Define auth mutations
export type AuthMutators = {
  setSession: (tx: WriteTransaction, session: Session) => Promise<void>
  clearSession: (tx: WriteTransaction) => Promise<void>
  updateUser: (tx: WriteTransaction, user: Partial<User>) => Promise<void>
}

// Implement auth mutators
const mutators: AuthMutators = {
  setSession: async (tx: WriteTransaction, session: Session) => {
    await tx.set('session', session)
  },

  clearSession: async (tx: WriteTransaction) => {
    await tx.del('session')
  },

  updateUser: async (tx: WriteTransaction, updates: Partial<User>) => {
    const session = await tx.get<Session>('session')
    if (!session) throw new Error('No active session')

    const updatedUser = { ...session.user, ...updates }
    await tx.set('session', { ...session, user: updatedUser })
  }
}

// Create auth client
export const createAuthClient = () => {
  return new Zero<AuthMutators>({
    mutators,
    storageKey: 'localhaven-auth'
  })
} 