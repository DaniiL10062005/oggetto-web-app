import { useQuery } from '@tanstack/react-query'
import { getLeaderboard, type GetLeaderboardParams } from '@/shared/api/waste-api'

export function useLeaderboard(params: GetLeaderboardParams) {
  return useQuery({
    queryKey: ['leaderboard', params],
    queryFn: () => getLeaderboard(params),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}
