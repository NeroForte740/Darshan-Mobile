import axios from 'axios'

import { navigate } from '@hooks/useNavigation'
import storage from './storage'

const api = axios.create({
  baseURL: 'http://10.0.2.2:3838',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {    
    if (error.response?.status === 401) {
      //@ts-ignore
      navigate('Login')
      await storage.clear()
    }
    
    return Promise.reject(error)
  }
)

export default api
