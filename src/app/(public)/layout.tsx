import type { ReactNode } from 'react'

interface KioskLayoutProps {
  children: ReactNode
}

export default function KioskLayout({ children }: KioskLayoutProps) {
  return (
    <div className='flex h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-neutral-50 to-green-50'>
      <main className='flex h-screen w-full flex-col overflow-hidden'>{children}</main>
    </div>
  )
}
