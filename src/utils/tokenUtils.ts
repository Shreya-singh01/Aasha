// JWT Token management utilities

const TOKEN_KEY = 'guardian_angel_token'
const USER_KEY = 'guardian_angel_user'

export interface TokenData {
  token: string
  expiresAt: number
}

// Store JWT token
export const storeToken = (token: string, expiresIn: number = 3600): void => {
  const expiresAt = Date.now() + (expiresIn * 1000)
  const tokenData: TokenData = { token, expiresAt }
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData))
}

// Get stored JWT token
export const getToken = (): string | null => {
  try {
    const tokenData = localStorage.getItem(TOKEN_KEY)
    if (!tokenData) return null

    const { token, expiresAt }: TokenData = JSON.parse(tokenData)
    
    // Check if token is expired
    if (Date.now() > expiresAt) {
      removeToken()
      return null
    }

    return token
  } catch (error) {
    console.error('Error getting token:', error)
    return null
  }
}

// Remove JWT token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

// Check if token is valid
export const isTokenValid = (): boolean => {
  return getToken() !== null
}

// Store user data
export const storeUser = (user: any): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// Get stored user data
export const getUser = (): any => {
  try {
    const userData = localStorage.getItem(USER_KEY)
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error('Error getting user data:', error)
    return null
  }
}

// Remove user data
export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY)
}

// Clear all auth data
export const clearAuthData = (): void => {
  removeToken()
  removeUser()
}

// Add token to request headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
} 