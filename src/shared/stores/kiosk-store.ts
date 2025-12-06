import { create } from 'zustand'

import type { DisposalResponse } from '@/shared/api/types'
import type { WasteClassification } from '@/shared/utils/waste-mapping'

type KioskStep = 'idle' | 'scanning' | 'instruction' | 'success'

interface KioskState {
  currentStep: KioskStep
  selectedItem: WasteClassification | null
  pointId: string | null
  pointName: string | null
  isInitialized: boolean
  initError: string | null
  lastDisposal: DisposalResponse | null
}

interface KioskActions {
  selectItem: (classification: WasteClassification) => void
  reset: () => void
  completeDisposal: () => void
  setPointId: (pointId: string) => void
  setPointInfo: (pointId: string, pointName: string) => void
  setInitError: (error: string) => void
  setInitialized: (initialized: boolean) => void
  setLastDisposal: (disposal: DisposalResponse | null) => void
}

type KioskStore = KioskState & KioskActions

export const useKioskStore = create<KioskStore>(set => ({
  currentStep: 'idle',
  selectedItem: null,
  pointId: null,
  pointName: null,
  isInitialized: false,
  initError: null,
  lastDisposal: null,

  selectItem: (classification: WasteClassification) => {
    set({
      selectedItem: classification,
      currentStep: 'instruction',
    })
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

  setInitError: (error: string) => {
    set({ initError: error, isInitialized: false })
  },

  setInitialized: (initialized: boolean) => {
    set({ isInitialized: initialized })
  },

  setLastDisposal: (disposal: DisposalResponse | null) => {
    set({ lastDisposal: disposal })
  },
}))
