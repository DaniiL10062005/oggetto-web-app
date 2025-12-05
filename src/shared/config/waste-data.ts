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
    label: 'Plastic Bottle',
    binColor: 'yellow',
    binLabel: 'Plastic',
    instruction: 'Remove cap and crush',
    iconName: 'bottle',
    keywords: ['plastic', 'bottle', 'water', 'drink', 'beverage', 'container'],
  },
  {
    id: 'coffee-cup',
    label: 'Coffee Cup',
    binColor: 'gray',
    binLabel: 'General Waste',
    instruction: 'Non-recyclable due to plastic lining',
    iconName: 'coffee',
    keywords: ['coffee', 'cup', 'paper cup', 'disposable', 'drink'],
  },
  {
    id: 'office-paper',
    label: 'Office Paper',
    binColor: 'blue',
    binLabel: 'Paper',
    instruction: 'Ensure no paper clips',
    iconName: 'file-text',
    keywords: ['paper', 'document', 'office', 'print', 'sheet', 'a4'],
  },
  {
    id: 'plastic-food-container',
    label: 'Plastic Food Container',
    binColor: 'yellow',
    binLabel: 'Plastic',
    instruction: 'Rinse food residue',
    iconName: 'container',
    keywords: ['plastic', 'container', 'food', 'lunch', 'tupperware', 'takeout'],
  },
  {
    id: 'glass-bottle',
    label: 'Glass Bottle',
    binColor: 'green',
    binLabel: 'Glass',
    instruction: 'Remove cap',
    iconName: 'wine',
    keywords: ['glass', 'bottle', 'jar', 'beverage', 'wine', 'beer'],
  },
]
