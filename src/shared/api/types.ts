export const GarbageType = {
  Cardboard: 'Cardboard',
  Glass: 'Glass',
  Metal: 'Metal',
  Paper: 'Paper',
  Plastic: 'Plastic',
  Trash: 'Trash',
} as const

export type GarbageType = (typeof GarbageType)[keyof typeof GarbageType]

export const GarbageSubtype = {
  PetBottle: 'pet_bottle',
  PetBottleWhite: 'pet_bottle_white',
  PetContainer: 'pet_container',
  HdpeContainer: 'hdpe_container',
  HdpeFilm: 'hdpe_film',
  HdpeBag: 'hdpe_bag',
  PpContainer: 'pp_container',
  PpLarge: 'pp_large',
  PpBag: 'pp_bag',
  FoamPackaging: 'foam_packaging',
  FoamEgg: 'foam_egg',
  FoamBuilding: 'foam_building',
  FoamFood: 'foam_food',
  BlisterPack: 'blister_pack',
  Toothbrush: 'toothbrush',
  PlasticCard: 'plastic_card',
  Tube: 'tube',
  Receipt: 'receipt',
  Unknown: 'unknown',
} as const

export type GarbageSubtype = (typeof GarbageSubtype)[keyof typeof GarbageSubtype]

export const GarbageState = {
  Clean: 'clean',
  Dirty: 'dirty',
  HeavilyDirty: 'heavily_dirty',
  FoodContaminated: 'food_contaminated',
  WithLabels: 'with_labels',
  NoLabels: 'no_labels',
  Compressed: 'compressed',
  Damaged: 'damaged',
  Unknown: 'unknown',
} as const

export type GarbageState = (typeof GarbageState)[keyof typeof GarbageState]

export interface CategorizeResponse {
  type: GarbageType
  subtype: GarbageSubtype
  state: GarbageState
  accepted: boolean
  text: string
}

export interface CreateDisposalDto {
  pointId: string
  type: GarbageType
  subtype: GarbageSubtype
  state: GarbageState
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

export interface QuestSubject {
  type: string
  subtype?: string
}

export interface Quest {
  id: string
  goal: number
  subject: QuestSubject
  createdAt: string
}

export interface QuestProgress {
  quest: Quest
  progress: number
  completed: boolean
}

export interface AllQuestsResponse {
  daily: QuestProgress[]
  weekly: QuestProgress | null
}

export interface ApiError {
  message: string
  code?: string
  statusCode: number
  details?: unknown
}

export type LeaderboardPeriod = 'daily' | 'week' | 'month'

export interface LeaderboardItem {
  userId: string
  name: string
  coins: number
  rank: number
}

export interface LeaderboardResponse {
  data: LeaderboardItem[]
  total: number
  page: number
  limit: number
  totalPages: number
  period: LeaderboardPeriod
}
