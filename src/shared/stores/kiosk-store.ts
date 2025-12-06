import { create } from 'zustand'

import { WASTE_ITEMS, type WasteItem } from '@/shared/mock/waste-data'

type KioskStep = 'idle' | 'scanning' | 'instruction' | 'success'

interface KioskState {
  currentStep: KioskStep
  selectedItem: WasteItem | null
  pointId: string | null
  pointName: string | null
  balance: number
  isInitialized: boolean
  initError: string | null
}

interface KioskActions {
  selectItem: (id: string) => void
  reset: () => void
  completeDisposal: () => void
  setPointId: (pointId: string) => void
  setPointInfo: (pointId: string, pointName: string) => void
  setBalance: (balance: number) => void
  setInitError: (error: string) => void
  setInitialized: (initialized: boolean) => void
}

type KioskStore = KioskState & KioskActions

export const useKioskStore = create<KioskStore>(set => ({
  currentStep: 'idle',
  selectedItem: null,
  pointId: null,
  pointName: null,
  balance: 0,
  isInitialized: false,
  initError: null,

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
    set({
      currentStep: 'success',
    })

    setTimeout(() => {
      set({
        currentStep: 'idle',
        selectedItem: null,
      })
    }, 2500)
  },

  setPointId: (pointId: string) => {
    set({ pointId, isInitialized: true, initError: null })
  },

  setPointInfo: (pointId: string, pointName: string) => {
    set({ pointId, pointName, isInitialized: true, initError: null })
  },

  setBalance: (balance: number) => {
    set({ balance })
  },

  setInitError: (error: string) => {
    set({ initError: error, isInitialized: false })
  },

  setInitialized: (initialized: boolean) => {
    set({ isInitialized: initialized })
  },
}))
