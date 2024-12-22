import type { LoginCredentials, Session } from './types'

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080'

export class AuthService {
  async login(credentials: LoginCredentials): Promise<Session> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  }

  async logout(): Promise<void> {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
  }

  async refreshToken(): Promise<Session> {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  }
} 