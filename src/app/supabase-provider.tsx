'use client';

import { createBrowserClient } from '@supabase/ssr'
import { createContext, useContext, useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'

type SupabaseContext = {
  supabase: SupabaseClient
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabase] = useState(() => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      console.log('Supabase URL:', typeof supabaseUrl, supabaseUrl?.slice(0, 10) + '...')
      console.log('Supabase Key:', typeof supabaseAnonKey, supabaseAnonKey ? 'exists' : 'missing')

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(`Supabase configuration is incomplete. URL: ${!!supabaseUrl}, Key: ${!!supabaseAnonKey}`)
      }

      const client = createBrowserClient(supabaseUrl, supabaseAnonKey)
      return client
    } catch (error) {
      console.error('Error initializing Supabase client:', error)
      throw error
    }
  })

  return (
    <Context.Provider value={{ supabase }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context
} 