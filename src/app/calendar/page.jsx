import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar1, ClipboardList, Ellipsis, Filter, MessagesSquare, Plus, Search, Star, UserPlus } from "lucide-react"
import AllScheduled, { NewEvent } from "@/components/AllScheduled"
import { CalendarProvider } from "@/context/CalendarProvider"

export default function Calendar() {
    const avatars = [
        { initials: "AL", image: null, backgroundColor: "#e6f3ff", textColor: "#4285f4" },
        { initials: "", image: "/api/placeholder/40/40", backgroundColor: "#f0f0f0", textColor: "#000000" },
        { initials: "DT", image: null, backgroundColor: "#e6ffe6", textColor: "#34a853" },
        { initials: "", image: "/api/placeholder/40/40", backgroundColor: "#f0f0f0", textColor: "#000000" },
        { initials: "+20", image: null, backgroundColor: "#ffffff", textColor: "#9aa0a6" },
    ];
    return (
        <CalendarProvider>
            <div>
                <div className="flex flex-col md:flex-row justify-between">
                    <div>
                        <h1 className='text-3xl mb-3'>Calendar</h1>
                        <p className='text-sm text-zinc-600'>Stay Organized and On Track with Your Personalized Calendar</p>
                    </div>
                    <div className="ml-auto">
                        <div className="inline-flex mr-5">
                            {avatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className="flex -mr-3 first:ml-0"
                                    style={{ zIndex: 5 - index }} >
                                    <Avatar className="size-10 border-2 border-white" style={{ backgroundColor: avatar.backgroundColor }}>
                                        {avatar.image ? (
                                            <AvatarImage src={avatar.image} alt={`Avatar ${index + 1}`} />
                                        ) : null}
                                        <AvatarFallback style={{ color: avatar.textColor }}>{avatar.initials}</AvatarFallback>
                                    </Avatar>
                                </div>
                            ))}
                        </div>

                        <Button variant='outline'><UserPlus className="mr-3" /> Invite</Button>
                    </div>
                </div>
                <Tabs defaultValue="scheduled" >
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-4 border-b overflow-hidden ">
                        <TabsList className='overflow-x-auto'>
                            <TabsTrigger value="scheduled"><Calendar1 /> All Scheduled</TabsTrigger>
                            <TabsTrigger value="events"><Star /> Events</TabsTrigger>
                            <TabsTrigger value="meetings"><MessagesSquare />Meetings</TabsTrigger>
                            <TabsTrigger value="taskreminders"><ClipboardList />Task Reminders</TabsTrigger>
                        </TabsList>
                        <div className="flex items-center gap-2 pb-5 ml-auto">
                            <div className="relative w-24">
                                <Search size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                                <input type="text" className="border rounded-sm w-full text-xs py-1.5 ps-8" placeholder="Search.." />
                            </div>
                            <Button className="text-xs" variant='outline'><Filter size={12} /> Filter</Button>
                            <Button className="text-xs" variant='outline'><Ellipsis /></Button>
                            <NewEvent />
                        </div>
                    </div>
                    <TabsContent value="scheduled">
                        <AllScheduled />
                    </TabsContent>
                    <TabsContent value="events">Change your password here.</TabsContent>
                    <TabsContent value="meetings">Meetings</TabsContent>
                    <TabsContent value="taskreminders">Taskreminders</TabsContent>
                </Tabs>
            </div>
        </CalendarProvider>
    )
}
