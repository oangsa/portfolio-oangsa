'use client'

import { ThemeProvider } from './ThemeProvider'

export function Providers({children}: { children: React.ReactNode }): JSX.Element {
  return (
    <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
      {children}
    </ThemeProvider>
  )
}
