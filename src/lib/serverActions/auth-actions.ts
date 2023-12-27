"use server"

import { z } from "zod"
import { FormSchema } from "../types"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const actionLoginUser = async ({
  email,
  password,
}: z.infer<typeof FormSchema>) => {
  const supabase = createRouteHandlerClient({ cookies })
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return response
}
