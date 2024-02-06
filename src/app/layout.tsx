import '../styles/globals.css'

import React from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from '~/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'expert notes',
  description: 'Automatic convert audio notes to text with React.'
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <>{children}</>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
