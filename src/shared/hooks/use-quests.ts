'use client'

import { useQuery } from '@tanstack/react-query'

import { getQuests } from '@/shared/api/waste-api'

export function useQuests() {
  return useQuery({
    queryKey: ['quests'],
    queryFn: getQuests,
    staleTime: 30_000,
    gcTime: 5 * 60 * 1000,
  })
}

