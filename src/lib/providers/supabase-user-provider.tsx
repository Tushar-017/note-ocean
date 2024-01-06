"use client"

import { AuthUser } from "@supabase/supabase-js"
import { Subscription } from "../supabase/supabase.types"
import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { getUserSubscriptionStatus } from "../supabase/queries"
import { useToast } from "@/components/ui/use-toast"

type SupabaseUserContextType = {
  user: AuthUser | null
  subscription: Subscription | null
}

const SupabaseContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
})

export const useSupabaseUser = () => {
  return useContext(SupabaseContext)
}

interface SupabaseUserProviderProps {
  children: React.ReactNode
}

export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Fetch the user details
  // Fetch the subscription details

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        console.log(user)
        const { data, error } = await getUserSubscriptionStatus(user.id)
        if (data) setSubscription(data)
        if (error) {
          toast({
            title: "Unexpected Error",
            description: "Oppse! an unexpected error happened. Try again later",
          })
        }
      }
    }
    getUser()
  }, [supabase, toast])

  return (
    <SupabaseContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseContext.Provider>
  )
}
