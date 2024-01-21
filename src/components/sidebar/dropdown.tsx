"use client"
import { useAppState } from "@/lib/providers/state-provider"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import React, { FC, ReactNode, useMemo, useState } from "react"
import { AccordionItem, AccordionTrigger } from "../ui/accordion"
import EmojiPicker from "../global/EmojiPicker"

interface DropdownProps {
  title: string
  id: string
  listType: "folder" | "file"
  iconId: string
  children?: ReactNode
  disable: Boolean
}

const Dropdown: FC<DropdownProps> = ({
  title,
  id,
  listType,
  iconId,
  children,
  disable,
  ...props
}) => {
  const supabase = createClientComponentClient()
  const { state, dispatch, workspaceId, folderId } = useAppState()
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  // folder title synced with server data and local
  // file title
  // Navigate the user to a different page
  const navigatePage = (accordionId: string, type: string) => {
    if (type === "folder") {
      router.push(`/dashboard/${workspaceId}/${accordionId}`)
    }
    if (type === "file") {
      router.push(`/dashboard/${workspaceId}/${folderId}/${accordionId}`)
    }
  }
  // add a file
  // double click handler
  // blur
  // onChanges
  const onChangeEmoji = async (selectedEmoji: string) => {
    if (!workspaceId) return
    if (listType === "folder") {
      dispatch({
        type: "UPDATE_FOLDER",
        payload: {
          workspaceId,
          folderId: id,
          folder: { iconId: selectedEmoji },
        },
      })
    }
  }
  // move to trash
  const isFolder = listType === "folder"
  const groupIdentifies = clsx(
    "dark:text-white whitespace-nowrap flex justify-between items-center w-full relative",
    {
      "group/folder": isFolder,
      "group/file": !isFolder,
    }
  )
  const listStyles = useMemo(
    () =>
      clsx("relative", {
        "border-none text-md": isFolder,
        "border-none ml-6 text-[16px] py-1": !isFolder,
      }),
    [isFolder]
  )

  return (
    <AccordionItem
      value={id}
      className={listStyles}
      onClick={(e) => {
        e.stopPropagation()
        navigatePage(id, listStyles)
      }}
    >
      <AccordionTrigger
        id={listType}
        className="hover:no-underline p-2 dark:text-muted-foreground text-sm"
        disabled={listType === "file"}
      >
        <div className={groupIdentifies}>
          <div className="flex gap-4 items-center justify-center overflow-hidden">
            <div className="relative">
              <EmojiPicker getValue={onChangeEmoji}>{iconId}</EmojiPicker>
            </div>
          </div>
        </div>
      </AccordionTrigger>
    </AccordionItem>
  )
}

export default Dropdown
