"use client"

import Sidebar from "@/components/sidebar"
import { SidebarProvider } from "@/components/sidebar-context"

export default function V1Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main>{children}</main>
    </SidebarProvider>
  )
}
