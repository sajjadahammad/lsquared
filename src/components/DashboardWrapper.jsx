import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Ellipsis, Share2, Star } from "lucide-react";

export default function DashboardWrapper({children}) {
  return (
    (<SidebarProvider className={'font-[family-name:var(--font-poppins)]'}>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Calendar</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-5 ml-auto">
              <button className="text-sm text-zinc-500">+ New Tab</button>
                <Star size={15} className="inline text-zinc-500"/>
                <Share2 size={15} className="inline text-zinc-500"/>
                <Ellipsis size={15} className="inline text-zinc-500"/>
              </div>
          </div>
        </header>
        <div className="px-5 py-3">
        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
