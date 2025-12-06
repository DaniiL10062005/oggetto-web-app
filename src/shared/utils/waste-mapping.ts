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
  accepted: boolean
  text: string
  binColor: BinColor
  binLabel: string
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

export function mapCategorizationToWaste(
  response: CategorizeResponse,
): WasteClassification {
  const type = !response.accepted ? 'Trash' : (response.type ?? 'Trash')
  const subtype = response.subtype ?? 'unknown'
  const state = response.state ?? 'unknown'
  const text = response.text ?? ''
  const accepted = response.accepted && true

  const binInfo = TYPE_TO_BIN[type]
  const displayLabel = SUBTYPE_LABELS[subtype] || 'Неизвестный предмет'

  return {
    type,
    subtype,
    state,
    binColor: binInfo.color,
    binLabel: binInfo.label,
    displayLabel,
    text,
    accepted,
  }
}
