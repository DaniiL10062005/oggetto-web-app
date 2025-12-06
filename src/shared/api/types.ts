export interface CategorizeResponse {
  category: string
  confidence: number
  instructions?: string
  imageUrl?: string
}

export interface CreateDisposalDto {
  pointId: string
  type: string
  subtype: string
  state: string
}

export interface DisposalResponse {
  id: string
  type: string
  subtype: string
  state: string
  pointId: string
  createdAt: string
  user: {
    id: string
    name: string
    login: string
    balance: number
    score: number
  }
}

export interface PointResponse {
  id: string
  name: string
  login: string
  score: number
  balance: number
  rank?: number
  avatar?: string
}

export interface PaginatedPointResponse {
  data: PointResponse[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ScorePeriod = 'daily' | 'week' | 'month'

export type SortDirection = 'asc' | 'desc'

export interface GetPointsParams {
  page?: number
  limit?: number
  score?: ScorePeriod
  sortByScore?: SortDirection
}

export interface QuestResponse {
  id: string
  title: string
  description: string
  reward: number
  target: number
  progress: number
  completed: boolean
  type?: string
  expiresAt?: string
}

export interface AllQuestsResponse {
  quests: QuestResponse[]
}

export interface ApiError {
  message: string
  code?: string
  statusCode: number
  details?: unknown
}
