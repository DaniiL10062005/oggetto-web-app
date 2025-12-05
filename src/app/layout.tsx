import { Montserrat } from 'next/font/google'

import { TanstackQueryProvider } from '../shared/config/providers/tanstack-query-provider'

import './globals.css'

const montserrat = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  )
}
