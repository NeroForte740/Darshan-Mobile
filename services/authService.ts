import api from './api'
import storage from './storage'

export const loginUser = async (credentials) => {
  try {
    const { email, password } = credentials

    const response = await api.post('/session', {
      email,
      password,
    })

    if (response.data && response.data.token) {
      await storage.setAuth({
        token: response.data.token
      })

      if (response.data.user) {
        await storage.setUser({
          user: JSON.stringify(response.data.user)
        })
      }
    }

    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erro ao fazer login')
  }
}
