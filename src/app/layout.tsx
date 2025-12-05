import { Geist } from 'next/font/google'

import './globals.css'
import { TanstackQueryProvider } from '@/shared/config/providers/tanstack-query-provider'

const geist = Geist({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  )
}
