'use client'

import { useQuery } from '@tanstack/react-query'

import { getQuests } from '@/shared/api/waste-api'
import { useKioskStore } from '@/shared/stores/kiosk-store'

export function useQuests() {
  const pointId = useKioskStore(state => state.pointId)

  return useQuery({
    queryKey: ['quests', pointId],
    queryFn: () => {
      if (!pointId) {
        throw new Error('Point ID не инициализирован')
      }
      return getQuests(pointId)
    },
    enabled: !!pointId,
    staleTime: 30_000,
    gcTime: 5 * 60 * 1000,
  })
}

