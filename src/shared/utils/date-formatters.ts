export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const isToday = date.toDateString() === now.toDateString()
  const isTomorrow = date.toDateString() === tomorrow.toDateString()

  if (isToday) {
    return 'Сегодня'
  } else if (isTomorrow) {
    return 'Завтра'
  } else {
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  }
}

