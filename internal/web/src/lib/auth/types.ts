export interface User {
  id: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: string
  updatedAt: string
}

export interface Session {
  user: User
  token: string
  expiresAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthError {
  code: string
  message: string
} 