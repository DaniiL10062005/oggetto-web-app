'use client'

import { useEffect } from 'react'

import { getPoints } from '@/shared/api/waste-api'
import { Env } from '@/shared/config/env'
import { useKioskStore } from '@/shared/stores/kiosk-store'

export function useKioskAuth() {
  const { setPointId, setInitError, isInitialized } = useKioskStore()

  useEffect(() => {
    if (isInitialized) return

    async function initializeKiosk() {
      try {
        const kioskLogin = Env.KIOSK_LOGIN || 'office1'

        const response = await getPoints({ limit: 100 })

        const kioskPoint = response.data.find(point => point.login === kioskLogin)

        if (!kioskPoint) {
          throw new Error(
            `Ошибка конфигурации киоска: Точка с логином '${kioskLogin}' не найдена`,
          )
        }

        setPointId(kioskPoint.id)

        console.log(`Киоск инициализирован: ${kioskPoint.name} (ID: ${kioskPoint.id})`)
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Не удалось инициализировать киоск: Неизвестная ошибка'

        console.error('Ошибка инициализации киоска:', errorMessage)
        setInitError(errorMessage)
      }
    }

    initializeKiosk()
  }, [isInitialized, setPointId, setInitError])

  return {
    isInitialized,
  }
}
