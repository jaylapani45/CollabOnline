"use client"
import { List } from "./list"
import { NewButton } from "./new-button"

export const Sidebar = () => {
    return (
        <aside className="h-full w-[60px] flex bg-blue-950 fixed left-0 z-[1] flex-col gap-y-4 p-3">
            <List />
            <NewButton />
        </aside>
    )
}