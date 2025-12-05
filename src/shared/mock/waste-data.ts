export type BinColor = 'yellow' | 'blue' | 'green' | 'gray'

export interface WasteItem {
  id: string
  label: string
  binColor: BinColor
  binLabel: string
  instruction: string
  iconName: string
  keywords: string[]
}

export const WASTE_ITEMS: WasteItem[] = [
  {
    id: 'plastic-bottle',
    label: 'Пластиковая бутылка',
    binColor: 'yellow',
    binLabel: 'Пластик',
    instruction: 'Снимите крышку и сдавите',
    iconName: 'bottle',
    keywords: ['plastic', 'bottle', 'water', 'drink', 'beverage', 'container'],
  },
  {
    id: 'coffee-cup',
    label: 'Стаканчик для кофе',
    binColor: 'gray',
    binLabel: 'Смешанные отходы',
    instruction: 'Не подлежит переработке из-за пластиковой подкладки',
    iconName: 'coffee',
    keywords: ['coffee', 'cup', 'paper cup', 'disposable', 'drink'],
  },
  {
    id: 'office-paper',
    label: 'Офисная бумага',
    binColor: 'blue',
    binLabel: 'Бумага',
    instruction: 'Убедитесь, что нет скрепок',
    iconName: 'file-text',
    keywords: ['paper', 'document', 'office', 'print', 'sheet', 'a4'],
  },
  {
    id: 'plastic-food-container',
    label: 'Пластиковый контейнер для еды',
    binColor: 'yellow',
    binLabel: 'Пластик',
    instruction: 'Промойте от остатков еды',
    iconName: 'container',
    keywords: ['plastic', 'container', 'food', 'lunch', 'tupperware', 'takeout'],
  },
  {
    id: 'glass-bottle',
    label: 'Стеклянная бутылка',
    binColor: 'green',
    binLabel: 'Стекло',
    instruction: 'Снимите крышку',
    iconName: 'wine',
    keywords: ['glass', 'bottle', 'jar', 'beverage', 'wine', 'beer'],
  },
]
