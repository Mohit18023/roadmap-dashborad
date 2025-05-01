
// src/app/layout.tsx

import './globals.css'
import { ReactNode } from 'react'
import { dark } from '@clerk/themes'
import { ClerkProvider } from '@clerk/nextjs'

import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Roadmap Dashboard',
  description: 'Your journey to tech mastery starts here.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-[#0F1729] text-foreground antialiased',
        inter.className
      )}>
        <ClerkProvider
          appearance={{ baseTheme: dark }}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="timeleft-theme"
          >
            <div className="relative flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">
                <div className="container max-w-screen-2xl py-4">
                  {/* <BackButton /> */}
                </div>
                {children}
              </main>
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
