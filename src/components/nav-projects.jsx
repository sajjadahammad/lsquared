"use client"

import { ChevronRight, Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function NavProjects({
  projects
}) {
  const { isMobile } = useSidebar()

  return (
    <Collapsible asChild defaultOpen={'true'} className="group/collapsible">
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    <CollapsibleTrigger>
      <div className="flex">
        <SidebarGroupLabel>MY PAGES</SidebarGroupLabel>
        <ChevronRight className="ml-auto transition-transform  self-center duration-200 group-data-[state=open]/collapsible:rotate-90 size-4" />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name} className='space-y-4'>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}>
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      </CollapsibleContent>
    </SidebarGroup>
    </Collapsible>
  );
}
