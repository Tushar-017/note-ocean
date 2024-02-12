import { useAppState } from "@/lib/providers/state-provider"
import { UploadBannerFormSchema } from "@/lib/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import React, { FC } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"

interface BannerUploadFormProps {
  dirType: "workspace" | "file" | "folder"
  id: string
}

const BannerUploadForm: FC<BannerUploadFormProps> = ({ dirType, id }) => {
  const supabase = createClientComponentClient()
  const { state, workspaceId, folderId, dispatch } = useAppState()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isUploading, errors },
  } = useForm<z.infer<typeof UploadBannerFormSchema>>({
    mode: "onChange",
    defaultValues: {
      banner: "",
    },
  })

  return <div></div>
}

export default BannerUploadForm
