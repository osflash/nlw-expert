'use client'

import React from 'react'

import * as Tooltip from '@radix-ui/react-tooltip'
import { Toaster } from 'sonner'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Tooltip.Provider>
        <>{children}</>
      </Tooltip.Provider>

      <Toaster richColors />
    </>
  )
}
