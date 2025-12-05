import type { ReactNode } from 'react'

interface KioskLayoutProps {
  children: ReactNode
}

export default function KioskLayout({ children }: KioskLayoutProps) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-neutral-50'>
      <main className='w-full max-w-6xl px-6 py-8'>{children}</main>
    </div>
  )
}
