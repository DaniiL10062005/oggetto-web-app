export function getWasteIcon(type: string): string {
  const iconMap: Record<string, string> = {
    plastic: '🥤',
    glass: '🍾',
    paper: '📄',
    metal: '🥫',
    organic: '🍎',
    electronic: '📱',
  }
  return iconMap[type?.toLowerCase()] || '♻️'
}

export function formatWasteType(type: string, subtype: string): string {
  const typeMap: Record<string, string> = {
    plastic: 'Пластик',
    glass: 'Стекло',
    paper: 'Бумага',
    metal: 'Металл',
    organic: 'Органика',
    electronic: 'Электроника',
  }

  const subtypeMap: Record<string, string> = {
    bottles: 'бутылки',
    pet_bottle: 'ПЭТ-бутылки',
    containers: 'контейнеры',
    bags: 'пакеты',
    cardboard: 'картон',
    newspaper: 'газеты',
    cans: 'банки',
    foil: 'фольга',
  }

  const typeName = typeMap[type?.toLowerCase()] || type || 'Отходы'

  if (!subtype) {
    return typeName
  }

  const subtypeName = subtypeMap[subtype.toLowerCase()] || subtype

  return `${typeName} (${subtypeName})`
}

