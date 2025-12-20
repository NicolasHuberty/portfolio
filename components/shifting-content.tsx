"use client"

import { useSidebar } from "./sidebar-context"
import { ReactNode } from "react"

interface ContentWrapperProps {
    children: ReactNode
    className?: string
}

// Wrapper for content AFTER the hero - adds margin when sidebar is visible
export function ShiftingContent({ children, className = "" }: ContentWrapperProps) {
    const { shouldShowSidebar } = useSidebar()

    return (
        <div
            className={`transition-all duration-500 ease-out ${shouldShowSidebar ? 'lg:ml-80' : 'ml-0'} ${className}`}
        >
            {children}
        </div>
    )
}
