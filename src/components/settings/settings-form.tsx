import React, { useRef, useState } from "react"
import { useToast } from "../ui/use-toast"
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider"
import { useAppState } from "@/lib/providers/state-provider"
import { User, workspace } from "@/lib/supabase/supabase.types"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Briefcase } from "lucide-react"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const SettingsForm = () => {
  const { toast } = useToast()
  const { user } = useSupabaseUser()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { state, workspaceId, dispatch } = useAppState()
  const [permissions, setPermissions] = useState("private")
  const [collaborators, setCollaborators] = useState<User[] | []>([])
  const [openAlertMessage, setOpenAlertMessage] = useState(false)
  const [workspaceDetails, setWorkspaceDetails] = useState<workspace>()
  const titleTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const [uploadProfilePic, setUploadProfilePic] = useState(false)

  // WIP Payment Portal

  // addCollaborators
  // remove collaborators
  // onChange
  const workspaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!workspaceId || !e.target.value) return
    dispatch({
      type: "UPDATE_WORKSPACE",
      payload: { workspace: { title: e.target.value }, workspaceId },
    })
    if (titleTimerRef.current) clearTimeout(titleTimerRef.current)
    titleTimerRef.current = setTimeout(async () => {
      // await updateWorkspace({ title: e.target.value }, workspaceId);
    }, 500)
  }

  // onClicks
  // fetching avatar details
  // get workspace details
  // get all collaborators

  // WIP payment portal redirect

  return (
    <div className="flex gap-4 flex-col">
      <p className="flex items-center gap-2 mt-6">
        <Briefcase size={20} />
        Workspace
      </p>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="workspaceName"
          className="text-sm text-muted-foreground"
        >
          Name
        </Label>
        <Input
          name="workspaceName"
          value={workspaceDetails ? workspaceDetails.title : ""}
          placeholder="Workspace Name"
          onChange={workspaceNameChange}
        />
      </div>
    </div>
  )
}

export default SettingsForm
