"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

/**
 * Provides the client context for the application.
 *
 * @param children - The child components to be wrapped by the ClientProvider.
 * @returns The wrapped components with the client context.
 */
function ClientProvider({ children } : { children: React.ReactNode }) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default ClientProvider