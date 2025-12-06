import axios from 'axios'

import { Env } from '@/shared/config/env'

export const apiClient = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  config => {
    if (Env.APP_TOKEN) {
      config.headers.Authorization = `Bearer ${Env.APP_TOKEN}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Неверные учетные данные')
    }
    return Promise.reject(error)
  },
)
