export function getWasteIcon(type: string): string {
  const iconMap: Record<string, string> = {
    plastic: '🥤',
    glass: '🍾',
    paper: '📄',
    cardboard: '📦',
    metal: '🥫',
    trash: '♻️',
    organic: '🍎',
    electronic: '📱',
  }
  return iconMap[type?.toLowerCase()] || '♻️'
}

export function formatWasteType(type: string, subtype?: string): string {
  // Type mappings (case-insensitive)
  const typeMap: Record<string, string> = {
    plastic: 'Пластик',
    glass: 'Стекло',
    paper: 'Бумага',
    cardboard: 'Картон',
    metal: 'Металл',
    trash: 'Отходы',
    organic: 'Органика',
    electronic: 'Электроника',
  }

  // Subtype mappings (matching the API subtypes)
  const subtypeMap: Record<string, string> = {
    pet_bottle: 'ПЭТ бутылка',
    pet_bottle_white: 'ПЭТ бутылка (белая)',
    pet_container: 'ПЭТ контейнер',
    hdpe_container: 'HDPE контейнер',
    hdpe_film: 'HDPE пленка',
    hdpe_bag: 'HDPE пакет',
    pp_container: 'PP контейнер',
    pp_large: 'PP крупный',
    pp_bag: 'PP пакет',
    foam_packaging: 'Пенопласт (упаковка)',
    foam_egg: 'Пенопласт (яичный лоток)',
    foam_building: 'Пенопласт (строительный)',
    foam_food: 'Пенопласт (пищевой)',
    blister_pack: 'Блистерная упаковка',
    toothbrush: 'Зубная щетка',
    plastic_card: 'Пластиковая карта',
    tube: 'Тюбик',
    receipt: 'Чек',
    unknown: 'Неизвестный предмет',
    // Additional common subtypes
    bottles: 'бутылки',
    containers: 'контейнеры',
    bags: 'пакеты',
    newspaper: 'газеты',
    cans: 'банки',
    foil: 'фольга',
  }

  const typeName = typeMap[type?.toLowerCase()] || type || 'Отходы'

  if (!subtype || subtype === 'unknown') {
    return typeName
  }

  const subtypeName = subtypeMap[subtype.toLowerCase()] || subtype

  return `${typeName} (${subtypeName})`
}

