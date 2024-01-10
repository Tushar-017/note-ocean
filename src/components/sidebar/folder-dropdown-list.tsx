import { useAppState } from "@/lib/providers/state-provider"
import { Folder } from "@/lib/supabase/supabase.types"
import React, { FC, useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider"

interface FoldersDropdownListProps {
  workspaceFolders: Folder[]
  workspaceId: string
}

const FolderDropdownList: FC<FoldersDropdownListProps> = ({
  workspaceFolders,
  workspaceId,
}) => {
  const { state, dispatch, folderId } = useAppState()
  // const { open, setOpen } = useSubscriptionModal()
  const { toast } = useToast()
  const [folders, setFolders] = useState(workspaceFolders)
  const { subscription } = useSupabaseUser()

  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      })
    }
  }, [workspaceFolders, workspaceId])

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    )
  }, [state, workspaceId])
  return (
    <>
      <div
        className="flex
        sticky 
        z-20 
        top-0 
        bg-background 
        w-full  
        h-10 
        group/title 
        justify-between 
        items-center 
        pr-4 
        text-Neutrals/neutrals-8
  "
      >
        <span
          className="text-Neutrals-8 
        font-bold 
        text-xs"
        >
          FOLDERS
        </span>
      </div>
    </>
  )
}

export default FolderDropdownList
