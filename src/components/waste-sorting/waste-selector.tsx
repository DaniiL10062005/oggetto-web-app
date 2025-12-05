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
import { WASTE_ITEMS } from '@/shared/config/waste-data'
import { useKioskStore } from '@/shared/stores/kiosk-store'
import { cn } from '@/shared/utils/class-names'

const iconMap: Record<string, LucideIcon> = {
  bottle: BottleWine,
  coffee: Coffee,
  'file-text': FileText,
  container: Container,
  wine: Wine,
}

const binColorStyles: Record<string, string> = {
  yellow: 'border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950/20',
  blue: 'border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20',
  green: 'border-green-500 hover:bg-green-50 dark:hover:bg-green-950/20',
  gray: 'border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-950/20',
}

export function WasteSelector() {
  const selectItem = useKioskStore(state => state.selectItem)

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {WASTE_ITEMS.map(item => {
        const Icon = iconMap[item.iconName] || Bottle

        return (
          <Button
            key={item.id}
            variant='outline'
            onClick={() => selectItem(item.id)}
            className={cn(
              'h-40 flex-col gap-4 border-4 text-lg font-semibold transition-all hover:scale-105 active:scale-95',
              binColorStyles[item.binColor],
            )}
          >
            <Icon className='size-12' />
            <span className='text-center'>{item.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
