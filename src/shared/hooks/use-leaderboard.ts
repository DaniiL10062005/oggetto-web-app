import { useQuery } from '@tanstack/react-query'
import { getLeaderboard, type GetLeaderboardParams } from '@/shared/api/waste-api'

export function useLeaderboard(params: GetLeaderboardParams) {
  return useQuery({
    queryKey: ['leaderboard', params],
    queryFn: () => getLeaderboard(params),
  })
}
