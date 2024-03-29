import Link from "next/link"
import React, { FC } from "react"
import { twMerge } from "tailwind-merge"
import CypressHomeIcon from "../icons/cypressHomeIcon"
import CypressSettingsIcon from "../icons/cypressSettingsIcon"
import CypressTrashIcon from "../icons/cypressTrashIcon"
import Settings from "../settings/settings"

interface NativeNavigationProps {
  myWorkspaceId: string
  className?: string
}

const NativeNavigation: FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  return (
    <nav className={twMerge("my-2", className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}`}
          >
            <CypressHomeIcon />
            <span>My Workspace</span>
          </Link>
        </li>
        <Settings>
          <li
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer
          "
          >
            <CypressSettingsIcon />
            <span>Settings</span>
          </li>
        </Settings>
        <li
          className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
        >
          <CypressTrashIcon />
          <span>Trash</span>
        </li>
      </ul>
    </nav>
  )
}

export default NativeNavigation
