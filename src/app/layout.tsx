// src/app/layout.tsx

import './globals.css'
import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'


export const metadata = {
  title: 'Roadmap Dashboard',
  description: 'Your journey to tech mastery starts here.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
    <html lang="en">
      <body>{children}</body>
    </html>
  </ClerkProvider>
  )
}
// export default function RootLayout({ children }: { children: ReactNode }) {