'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { categorizeItem, createDisposal, getPoints, getQuests } from './waste-api'

export function useCategorizeItem() {
  return useMutation({
    mutationFn: categorizeItem,
    onSuccess: data => {
      console.log('Категория обнаружена:', data.category)
      console.log('Уверенность:', data.confidence)
    },
  })
}

export function useCreateDisposal() {
  return useMutation({
    mutationFn: createDisposal,
    onSuccess: data => {
      console.log('ID утилизации:', data.id)
      console.log('Новый баланс:', data.user.balance)
    },
  })
}

export function useLeaderboard(period: 'daily' | 'week' | 'month' = 'week') {
  return useQuery({
    queryKey: ['leaderboard', period],
    queryFn: () =>
      getPoints({
        page: 1,
        limit: 10,
        score: period,
        sortByScore: 'desc',
      }),
  })
}

export function useQuests() {
  return useQuery({
    queryKey: ['quests'],
    queryFn: getQuests,
  })
}

export function ExampleComponent() {
  const categorizeMutation = useCategorizeItem()
  const disposalMutation = useCreateDisposal()
  const { data: leaderboard } = useLeaderboard('daily')
  const { data: quests } = useQuests()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      categorizeMutation.mutate(file)
    }
  }

  const handleDispose = () => {
    disposalMutation.mutate({
      pointId: 'point-id-here',
      type: 'plastic',
      subtype: 'bottle',
      state: 'clean',
    })
  }

  return (
    <div>
      <h1>Пример использования API сортировки отходов</h1>

      <input type='file' accept='image/*' onChange={handleImageUpload} />

      {categorizeMutation.data && (
        <div>
          <p>Категория: {categorizeMutation.data.category}</p>
          <p>Уверенность: {categorizeMutation.data.confidence}</p>
        </div>
      )}

      <button onClick={handleDispose}>Подтвердить утилизацию</button>

      {disposalMutation.data && (
        <div>
          <p>ID утилизации: {disposalMutation.data.id}</p>
          <p>Новый баланс: {disposalMutation.data.user.balance}</p>
        </div>
      )}

      {leaderboard && (
        <div>
          <h2>Ежедневный рейтинг</h2>
          {leaderboard.data.map(entry => (
            <div key={entry.id}>
              {entry.rank}. {entry.name} - {entry.score} очков
            </div>
          ))}
        </div>
      )}

      {quests && (
        <div>
          <h2>Квесты</h2>
          {quests.quests.map(quest => (
            <div key={quest.id}>
              <h3>{quest.title}</h3>
              <p>{quest.description}</p>
              <p>
                Прогресс: {quest.progress}/{quest.target}
              </p>
              <p>Награда: {quest.reward} очков</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
