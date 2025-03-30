"use client"

import * as React from "react"
import {
  AudioWaveform,
  Plus,
  Calendar1,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Bolt,
  BellDot,
  Search
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {

  teams: [
    {
      name: "Manageko",
      logo: GalleryVerticalEnd,
      plan: "Manag@mail.com",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Notification",
      url: "#",
      icon: BellDot,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar1,

    },
    {
      title: "Settings",
      url: "#",
      icon: Bolt,

    },
  ],
  projects: [
    {
      name: "CrafBoard Project",
      url: "#",
      icon: () => (
        <div className='bg-gradient-to-r from-purple-500 to-purple-400 shadow text-white p-1 rounded'>
          <Frame className="size-4"/> 
        </div>
      ),
    },
    {
      name: "Cudemo Project",
      url: "#",
      icon: ()=>(
        <div className='bg-gradient-to-r from-violet-700 to-violet-400 shadow text-white p-1 rounded'>
          <PieChart className="size-4"/>
        </div>
      ),
    },
    {
      name: "Angular Studio",
      url: "#" ,
      icon: ()=>(
        <div className='bg-gradient-to-r from-blue-700 to-blue-400 shadow text-white p-1 rounded'>
        <Map className="size-4"/>
        </div>
      ),
    },
    {
      name: "Create New",
      url: "#",
      icon: Plus,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
