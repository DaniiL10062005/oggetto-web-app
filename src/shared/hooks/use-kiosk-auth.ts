'use client'

import { useEffect } from 'react'

import { getPointById, getPoints } from '@/shared/api/waste-api'
import { Env } from '@/shared/config/env'
import { useKioskStore } from '@/shared/stores/kiosk-store'

export function useKioskAuth() {
  const { setPointInfo, setInitError, isInitialized } = useKioskStore()

  useEffect(() => {
    if (isInitialized) return

    async function initializeKiosk() {
      try {
        const kioskLogin = Env.KIOSK_LOGIN

        if (!kioskLogin) {
          throw new Error(
            'Ошибка конфигурации: Переменная NEXT_PUBLIC_KIOSK_LOGIN не установлена',
          )
        }

        console.log(`Поиск точки с логином: ${kioskLogin}`)

        const response = await getPoints({ limit: 100 })

        if (!response.data || response.data.length === 0) {
          throw new Error('Ошибка сервера: Не удалось получить список точек сбора')
        }

        const kioskPoint = response.data.find(point => point.login === kioskLogin)

        if (!kioskPoint) {
          throw new Error(
            `Ошибка конфигурации: Точка с логином '${kioskLogin}' не найдена в системе. Доступные точки: ${response.data.map(p => p.login).join(', ')}`,
          )
        }

        console.log(`Точка найдена: ${kioskPoint.name} (ID: ${kioskPoint.id})`)

        const verifiedPoint = await getPointById(kioskPoint.id)

        if (!verifiedPoint) {
          throw new Error(
            `Ошибка верификации: Не удалось получить данные точки с ID '${kioskPoint.id}'`,
          )
        }

        console.log(
          `[Инициализация] Точка верифицирована: ${verifiedPoint.name} | Баланс: ${verifiedPoint.balance} очков`,
        )

        setPointInfo(verifiedPoint.id, verifiedPoint.name)
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Неизвестная ошибка инициализации киоска'

        console.error('Критическая ошибка:', errorMessage)
        setInitError(errorMessage)
      }
    }

    initializeKiosk()
  }, [isInitialized, setPointInfo, setInitError])

  return {
    isInitialized,
  }
}
