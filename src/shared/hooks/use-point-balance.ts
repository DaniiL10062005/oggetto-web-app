'use client'

import { useQuery } from '@tanstack/react-query'

import { getPointById } from '@/shared/api/waste-api'
import { useKioskStore } from '@/shared/stores/kiosk-store'

export function usePointBalance() {
  const pointId = useKioskStore(state => state.pointId)

  return useQuery({
    queryKey: ['point-balance', pointId],
    queryFn: () => {
      if (!pointId) {
        throw new Error('Point ID не инициализирован')
      }
      return getPointById(pointId)
    },
    enabled: !!pointId,
    refetchInterval: 10000,
    staleTime: 5000,
  })
}
