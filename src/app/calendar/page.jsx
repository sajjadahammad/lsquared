import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import { Button } from "@/components/ui/button"

import { Calendar1, ClipboardList, Ellipsis, Filter, MessagesSquare, Plus, Search, Star } from "lucide-react"
import NewEvent from "@/components/NewEvent"
import AllScheduled from "@/components/AllScheduled"

export default function Calendar() {
    return (
        <div>
            <h1 className='text-3xl'>Calendar</h1>
            <p className='text-sm text-zinc-600'>Stay Organized and On Track with Your Personalized Calendar</p>
            <Tabs defaultValue="scheduled" >
                <div className="flex items-center justify-between mb-4 border-b ">
                    <TabsList>
                        <TabsTrigger value="scheduled"><Calendar1/> All Scheduled</TabsTrigger>
                        <TabsTrigger value="events"><Star/> Events</TabsTrigger>
                        <TabsTrigger value="meetings"><MessagesSquare/>Meetings</TabsTrigger>
                        <TabsTrigger value="taskreminders"><ClipboardList/>Task Reminders</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2 pb-5">
                        <div className="relative w-24">
                            <Search size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2"/>
                            <input type="text" className="border rounded-sm w-full text-xs py-1.5 ps-8" placeholder="Search.." />
                        </div>
                        <Button className="text-xs" variant='outline'><Filter size={12}/> Filter</Button>
                        <Button className="text-xs" variant='outline'><Ellipsis/></Button>
                        <NewEvent/>
                    </div>
                </div>
                <TabsContent value="scheduled">
                    <AllScheduled/>
                </TabsContent>
                <TabsContent value="events">Change your password here.</TabsContent>
                <TabsContent value="meetings">Meetings</TabsContent>
                <TabsContent value="taskreminders">Taskreminders</TabsContent>
            </Tabs>
        </div>
    )
}
