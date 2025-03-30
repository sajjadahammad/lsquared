'use client'

import { useCalendar } from "@/context/CalendarProvider"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"

export default function Events() {
    const { events: data } = useCalendar()

    const event = data.filter(event => event.title.includes("Design"))

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {event.map((evt)=>(
                 <Card style={{backgroundColor:evt.backgroundColor}} key={evt.id}>
                 <CardHeader>
                     <CardTitle className='text-sm h-12 font-medium'>{evt.title}</CardTitle>
                 </CardHeader>
                 <CardFooter className='flex gap-3 justify-between text-xs'>
                     <p>{format(new Date(evt.start), "h:mm a")}</p>
                     <p>{format(new Date(evt.end), "h:mm a")}</p>
                 </CardFooter>
             </Card>
            ))}
           
        </div>
    )
}
