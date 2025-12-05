import { create } from 'zustand'

import { WASTE_ITEMS, type WasteItem } from '@/shared/mock/waste-data'

type KioskStep = 'idle' | 'scanning' | 'instruction' | 'success'

interface KioskState {
  currentStep: KioskStep
  selectedItem: WasteItem | null
  points: number
}

interface KioskActions {
  selectItem: (id: string) => void
  reset: () => void
  completeDisposal: () => void
}

type KioskStore = KioskState & KioskActions

export const useKioskStore = create<KioskStore>(set => ({
  currentStep: 'idle',
  selectedItem: null,
  points: 0,

  selectItem: (id: string) => {
    const item = WASTE_ITEMS.find(wasteItem => wasteItem.id === id)
    if (item) {
      set({
        selectedItem: item,
        currentStep: 'instruction',
      })
    }
  },

  reset: () => {
    set({
      currentStep: 'idle',
      selectedItem: null,
    })
  },

  completeDisposal: () => {
    set(state => ({
      points: state.points + 10,
      currentStep: 'success',
    }))

    setTimeout(() => {
      set({
        currentStep: 'idle',
        selectedItem: null,
      })
    }, 2000)
  },
}))
