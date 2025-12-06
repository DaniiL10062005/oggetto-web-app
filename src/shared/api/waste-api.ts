import { apiClient } from './client'
import type {
  AllQuestsResponse,
  CategorizeResponse,
  CreateDisposalDto,
  DisposalResponse,
  GetPointsParams,
  PaginatedPointResponse,
  PointResponse,
} from './types'

export async function login(_login: string, _password: string): Promise<boolean> {
  console.warn('login() устарела. Используйте статический APP_TOKEN из env.')
  return false
}

export async function categorizeItem(imageFile: File): Promise<CategorizeResponse> {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await apiClient.post<CategorizeResponse>('/categorize', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export async function createDisposal(data: CreateDisposalDto): Promise<DisposalResponse> {
  const response = await apiClient.post<DisposalResponse>('/disposals', data)
  return response.data
}

export async function getPoints(
  params: GetPointsParams = {},
): Promise<PaginatedPointResponse> {
  const response = await apiClient.get<PaginatedPointResponse>('/points', {
    params,
  })
  return response.data
}

export async function getPointById(pointId: string): Promise<PointResponse> {
  const response = await apiClient.get<PointResponse>(`/points/${pointId}`)
  return response.data
}

export async function getQuests(): Promise<AllQuestsResponse> {
  const response = await apiClient.get<AllQuestsResponse>('/quests')
  return response.data
}

export const wasteApi = {
  login,
  categorizeItem,
  createDisposal,
  getPoints,
  getPointById,
  getQuests,
}
