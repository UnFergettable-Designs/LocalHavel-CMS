import { derived } from 'svelte/store'
import { createAuthClient } from '../lib/auth/store'
import { AuthService } from '../lib/auth/service'
import type { LoginCredentials, Session, User } from '../lib/auth/types'

const authClient = createAuthClient()
const authService = new AuthService()

export const createAuthStore = () => {
  // Subscribe to session changes
  const session = derived(
    authClient.subscribe(tx => tx.get<Session>('session')),
    $session => $session || null
  )

  return {
    session,
    
    async login(credentials: LoginCredentials) {
      try {
        const session = await authService.login(credentials)
        await authClient.mutate.setSession(session)
        return session
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    async logout() {
      try {
        await authService.logout()
        await authClient.mutate.clearSession()
      } catch (error) {
        console.error('Logout failed:', error)
        throw error
      }
    },

    async updateUser(updates: Partial<User>) {
      await authClient.mutate.updateUser(updates)
    },

    isAuthenticated(): boolean {
      return session !== null
    }
  }
}

// Create singleton instance
export const auth = createAuthStore() 