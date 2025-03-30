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

export default function Meetings() {
    const { events: data } = useCalendar()

    const meetings = data.filter(event => event.title.includes("Meeting"))

    console.log('sdf',meetings);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {meetings.map((msg) => (
                <Card style={{ backgroundColor: msg.backgroundColor }} key={msg.id}>
                    <CardHeader>
                        <CardTitle className='text-sm h-12 font-medium'>{msg.title}</CardTitle>
                    </CardHeader>
                    <CardFooter className='flex gap-3 justify-between text-xs'>
                        <p>{format(new Date(msg.start), "h:mm a")}</p>
                        <p>{format(new Date(msg.end), "h:mm a")}</p>
                    </CardFooter>
                </Card>
            ))}

        </div>
    )
}
