"use client"

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({items}) {

  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item,idx) => (

            <Link key={idx} href={item.url} className={`${pathname===item.url?'bg-white shadow-sm rounded-md font-medium border transition-all ease-in-out duration-200':'text-gray-600'}`}>
            <SidebarMenuItem >
              <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                   {item.title==='Notification'&&<span className="ml-auto bg-violet-200 text-violet-800 rounded-sm h-5 px-1 flex items-center justify-center text-xs font-semibold">99+</span>}
                  </SidebarMenuButton>
            </SidebarMenuItem>
            </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
