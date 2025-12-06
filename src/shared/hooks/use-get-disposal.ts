'use client'

import { useMutation } from '@tanstack/react-query'

import type { GetDisposalDto, GetDisposalResponse } from '@/shared/api/types'
import { getDisposal } from '@/shared/api/waste-api'

export function useGetDisposal() {
  return useMutation<GetDisposalResponse, Error, GetDisposalDto>({
    mutationFn: params => getDisposal(params),
  })
}
