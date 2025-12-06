'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { DisposalResponse, PointResponse } from '@/shared/api/types'
import { createDisposal } from '@/shared/api/waste-api'
import { useKioskStore } from '@/shared/stores/kiosk-store'

interface CreateDisposalParams {
  type: string
  subtype: string
  state: string
}

export function useCreateDisposal() {
  const queryClient = useQueryClient()
  const pointId = useKioskStore(state => state.pointId)
  const setLastDisposal = useKioskStore(state => state.setLastDisposal)

  return useMutation({
    mutationFn: async (params: CreateDisposalParams) => {
      if (!pointId) {
        throw new Error(
          'Point ID не инициализирован. Невозможно создать запись об утилизации.',
        )
      }

      return createDisposal({
        pointId,
        type: params.type,
        subtype: params.subtype,
        state: params.state,
      })
    },

    onSuccess: (data: DisposalResponse) => {
      setLastDisposal(data)

      if (pointId && data.user) {
        queryClient.setQueryData<PointResponse>(['point', pointId], oldData => {
          const newData = !oldData
            ? {
                id: data.user.id,
                name: data.user.name,
                login: data.user.login,
                balance: data.user.balance,
                score: data.user.score,
              }
            : {
                ...oldData,
                balance: data.user.balance,
                score: data.user.score,
              }

          return newData
        })

        // const verifyCache = queryClient.getQueryData<PointResponse>(['point', pointId])
      } else {
        if (pointId && !data.user) {
          queryClient.invalidateQueries({ queryKey: ['point', pointId] })
        }
      }
    },

    onError: error => {
      console.error('Не удалось создать запись об утилизации:', error)
    },
  })
}
