import type {
  CategorizeResponse,
  GarbageState,
  GarbageSubtype,
  GarbageType,
} from '@/shared/api/types'
import type { BinColor } from '@/shared/mock/waste-data'

export interface WasteClassification {
  type: GarbageType
  subtype: GarbageSubtype
  state: GarbageState
  binColor: BinColor
  binLabel: string
  instruction: string
  displayLabel: string
}

const TYPE_TO_BIN: Record<GarbageType, { color: BinColor; label: string }> = {
  Cardboard: { color: 'blue', label: 'Картон' },
  Glass: { color: 'green', label: 'Стекло' },
  Metal: { color: 'gray', label: 'Металл' },
  Paper: { color: 'blue', label: 'Бумага' },
  Plastic: { color: 'yellow', label: 'Пластик' },
  Trash: { color: 'gray', label: 'Смешанные отходы' },
}

const SUBTYPE_LABELS: Record<GarbageSubtype, string> = {
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
}

function getInstructionForItem(
  type: GarbageType,
  subtype: GarbageSubtype,
  state: GarbageState,
): string {
  const instructions: string[] = []

  if (state === 'dirty' || state === 'heavily_dirty' || state === 'food_contaminated') {
    instructions.push('Промойте от загрязнений')
  }

  if (state === 'with_labels' && type === 'Plastic') {
    instructions.push('Желательно снять этикетки')
  }

  if (subtype.includes('bottle') && type === 'Plastic') {
    instructions.push('Снимите крышку и сдавите')
  }

  if (subtype.includes('bottle') && type === 'Glass') {
    instructions.push('Снимите крышку')
  }

  if (type === 'Paper' || type === 'Cardboard') {
    instructions.push('Убедитесь, что нет скрепок и зажимов')
  }

  if (state === 'damaged' && type !== 'Trash') {
    instructions.push('Поврежденные предметы могут не подлежать переработке')
  }

  if (type === 'Trash') {
    instructions.push('Не подлежит переработке')
  }

  if (instructions.length === 0) {
    instructions.push('Положите в соответствующий контейнер')
  }

  return instructions.join('. ')
}

export function mapCategorizationToWaste(
  response: CategorizeResponse,
): WasteClassification {
  const binInfo = TYPE_TO_BIN[response.type]
  const displayLabel = SUBTYPE_LABELS[response.subtype]
  const instruction = getInstructionForItem(response.type, response.subtype, response.state)

  return {
    type: response.type,
    subtype: response.subtype,
    state: response.state,
    binColor: binInfo.color,
    binLabel: binInfo.label,
    instruction,
    displayLabel,
  }
}
