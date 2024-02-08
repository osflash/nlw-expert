'use client'

import React from 'react'

import * as Tooltip from '@radix-ui/react-tooltip'
import { Toaster } from 'sonner'
import { queryClient } from '~/services/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Tooltip.Provider>
          <>{children}</>
        </Tooltip.Provider>

        <Toaster richColors />
      </QueryClientProvider>
    </>
  )
}
