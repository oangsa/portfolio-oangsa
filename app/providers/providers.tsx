'use client'

import {NextUIProvider} from '@nextui-org/react'
import { ThemeProvider } from './ThemeProvider'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider themes={['light', 'dark-classic', 'tangerine', 'dark-tangerine', 'mint', 'dark-mint']} enableColorScheme defaultTheme="light">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}