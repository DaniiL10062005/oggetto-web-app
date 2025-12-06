'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createDisposal } from '@/shared/api/waste-api'
import type { DisposalResponse, PointResponse } from '@/shared/api/types'
import { useKioskStore } from '@/shared/stores/kiosk-store'

interface CreateDisposalParams {
  type: string
  subtype: string
  state: string
}

export function useCreateDisposal() {
  const queryClient = useQueryClient()
  const pointId = useKioskStore(state => state.pointId)

  return useMutation({
    mutationFn: async (params: CreateDisposalParams) => {
      if (!pointId) {
        throw new Error('Point ID не инициализирован. Невозможно создать запись об утилизации.')
      }

      return createDisposal({
        pointId,
        type: params.type,
        subtype: params.subtype,
        state: params.state,
      })
    },

    onSuccess: (data: DisposalResponse) => {
      if (pointId && data.user) {
        queryClient.setQueryData<PointResponse>(
          ['point-balance', pointId],
          oldData => {
            if (!oldData) {
              return {
                id: data.user.id,
                name: data.user.name,
                login: data.user.login,
                balance: data.user.balance,
                score: data.user.score,
              }
            }

            return {
              ...oldData,
              balance: data.user.balance,
              score: data.user.score,
            }
          },
        )

        console.log('Утилизация записана успешно. Новый баланс:', data.user.balance)
      }
    },

    onError: error => {
      console.error('Не удалось создать запись об утилизации:', error)
    },
  })
}
