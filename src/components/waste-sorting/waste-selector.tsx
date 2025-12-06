'use client'

import {
  BottleWine,
  Coffee,
  Container,
  FileText,
  type LucideIcon,
  Wine,
} from 'lucide-react'

import { Button } from '@/shared/components/button'
import { WASTE_ITEMS } from '@/shared/mock/waste-data'
import { useKioskStore } from '@/shared/stores/kiosk-store'
import { cn } from '@/shared/utils/class-names'

const ICON_MAP: Record<string, LucideIcon> = {
  bottle: BottleWine,
  coffee: Coffee,
  'file-text': FileText,
  container: Container,
  wine: Wine,
}

const BIN_COLOR_STYLES: Record<string, string> = {
  yellow: 'border-yellow-500 hover:bg-yellow-50',
  blue: 'border-blue-500 hover:bg-blue-50',
  green: 'border-green-500 hover:bg-green-50',
  gray: 'border-gray-500 hover:bg-gray-50',
}

const BIN_COLOR_TEXT_STYLES: Record<string, string> = {
  yellow: 'text-yellow-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  gray: 'text-gray-500',
}

interface WasteSelectorProps {
  onSelect?: () => void
}

export function WasteSelector({ onSelect }: WasteSelectorProps = {}) {
  const selectItem = useKioskStore(state => state.selectItem)

  const handleSelect = (id: string) => {
    selectItem(id)
    onSelect?.()
  }

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-6'>
      {WASTE_ITEMS.map(item => {
        const Icon = ICON_MAP[item.iconName] || BottleWine

        return (
          <Button
            key={item.id}
            variant='outline'
            onClick={() => handleSelect(item.id)}
            className={cn(
              'h-auto min-h-[80px] flex-row items-center gap-3 border-2 p-4 text-left text-base font-semibold transition-all hover:scale-105 active:scale-95 lg:min-h-[120px] lg:gap-4 lg:border-4 lg:p-6 lg:text-lg',
              BIN_COLOR_STYLES[item.binColor],
            )}
          >
            <Icon
              className={cn('size-8 shrink-0 lg:size-12', BIN_COLOR_TEXT_STYLES[item.binColor])}
            />
            <span className='wrap-break-word whitespace-normal'>{item.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
