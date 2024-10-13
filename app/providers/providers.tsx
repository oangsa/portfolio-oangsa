'use client'

import {NextUIProvider} from '@nextui-org/react'
import { ThemeProvider } from './ThemeProvider'

export function Providers({children}: { children: React.ReactNode }): JSX.Element {
  return (
    <NextUIProvider>
      <ThemeProvider defaultTheme="light" attribute='class'>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}