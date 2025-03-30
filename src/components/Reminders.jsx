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

export default function Reminders() {
        const { events: data } = useCalendar()
    
        const reminders = data.filter(event => event.title.includes("Meetup"))
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 gap-3">
    {reminders.map((rmd) => (
        <Card style={{ backgroundColor: rmd.backgroundColor }} key={rmd.id}>
            <CardHeader>
                <CardTitle className='text-sm h-12 font-medium'>{rmd.title}</CardTitle>
            </CardHeader>
            <CardFooter className='flex gap-3 justify-between text-xs'>
                <p>{format(new Date(rmd.start), "h:mm a")}</p>
                <p>{format(new Date(rmd.end), "h:mm a")}</p>
            </CardFooter>
        </Card>
    ))}

</div>
  )
}
