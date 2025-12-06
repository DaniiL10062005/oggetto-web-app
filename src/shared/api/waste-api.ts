import { apiClient } from './client'
import type {
  AllQuestsResponse,
  CategorizeResponse,
  CreateDisposalDto,
  DisposalResponse,
  GetPointsParams,
  LeaderboardPeriod,
  LeaderboardResponse,
  PaginatedPointResponse,
  PointResponse,
} from './types'

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
  data.type = 'Glass'
  data.subtype = 'pet_bottle'
  data.state = 'clean'

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

export interface GetLeaderboardParams {
  period: LeaderboardPeriod
  page?: number
  limit?: number
}

export async function getLeaderboard(
  params: GetLeaderboardParams,
): Promise<LeaderboardResponse> {
  const response = await apiClient.get<LeaderboardResponse>('/leaderboard', {
    params,
  })
  return response.data
}

export const wasteApi = {
  categorizeItem,
  createDisposal,
  getPoints,
  getPointById,
  getQuests,
  getLeaderboard,
}
