"use client"
import { Home, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

export function AppSidebar() {
  // Menu items.
  const items = [
    {
      title: `Home`,
      url: "/",
      icon: Home,
    },
    {
      title: `Transcript`,
      url: "/transcript",
      icon: User,
    },
    {
      title: `Thumbnail`,
      url: "/thumbnail",
      icon: User,
    }
  ]
  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-[#1a1a1a] text-white">
        <SidebarGroup>
          <div className="h-16 flex items-center ">
            <SidebarGroupLabel className="text-2xl text-white font-bold">
              <Link href={"/"}>
                Scypte
              </Link>
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}