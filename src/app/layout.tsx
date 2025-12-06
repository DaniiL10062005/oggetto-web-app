import { Geist } from 'next/font/google'

import { KioskInitializer } from '@/components/kiosk/kiosk-initializer'

import './globals.css'
import { TanstackQueryProvider } from '@/shared/config/providers/tanstack-query-provider'

const geist = Geist({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geist.className} min-h-screen overflow-y-auto antialiased lg:h-screen lg:overflow-hidden`}
      >
        <TanstackQueryProvider>
          <KioskInitializer>{children}</KioskInitializer>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}
