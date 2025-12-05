import type { ReactNode } from 'react'

import { AuroraBackground } from '@/shared/components/aurora-background'

interface KioskLayoutProps {
  children: ReactNode
}

export default function KioskLayout({ children }: KioskLayoutProps) {
  return (
    <AuroraBackground>
      <main className='flex h-screen w-full flex-col overflow-hidden'>{children}</main>
    </AuroraBackground>
  )
}
