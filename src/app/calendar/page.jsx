import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

export default function Calendar() {
    return (
        <div>
            <h1 className='text-3xl'>Calendar</h1>
            <p className='text-sm text-zinc-600'>Stay Organized and On Track with Your Personalized Calendar</p>
            <Tabs defaultValue="scheduled" >
                <TabsList>
                    <TabsTrigger value="scheduled">All Scheduled</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="meetings">Meetings</TabsTrigger>
                    <TabsTrigger value="taskreminders">Task Reminders</TabsTrigger>
                </TabsList>
                <TabsContent value="scheduled">Make changes to your account here.</TabsContent>
                <TabsContent value="events">Change your password here.</TabsContent>
                <TabsContent value="meetings">Meetings</TabsContent>
                <TabsContent value="taskreminders">Taskreminders</TabsContent>
            </Tabs>
        </div>
    )
}
