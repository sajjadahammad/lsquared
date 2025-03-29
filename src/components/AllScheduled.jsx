"use client"

import { useState, useRef } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus } from "lucide-react"
import { useCalendar } from "@/context/CalendarProvider"
import EventModal from "@/components/EventModal"


export const NewEvent =() =>{
    const {  openCreateModal} = useCalendar()
    return(
        <Button
        size="sm"
        className="m-1 cursor-pointer"
        onClick={() => {
          const now = new Date()
          openCreateModal({
            dateStr: now.toISOString(),
            allDay: false,
          })
        }}
      >
        <Plus className="h-4 w-4 mr-1" /> New
      </Button>
    )
}

export default function AllScheduled() {
    const calendarRef = useRef(null)
    const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 24)) // June 24, 2024
    const [view, setView] = useState("timeGridWeek")
  
    const { events, openCreateModal, openEditModal, handleEventDrop, handleEventResize, isModalOpen } = useCalendar()
  
    const handlePrev = () => {
      if (calendarRef.current) {
        calendarRef.current.getApi().prev()
        setCurrentDate(calendarRef.current.getApi().getDate())
      }
    }
  
    const handleNext = () => {
      if (calendarRef.current) {
        calendarRef.current.getApi().next()
        setCurrentDate(calendarRef.current.getApi().getDate())
      }
    }
  
    const handleToday = () => {
      if (calendarRef.current) {
        calendarRef.current.getApi().today()
        setCurrentDate(calendarRef.current.getApi().getDate())
      }
    }
  
    const handleViewChange = (newView) => {
      setView(newView)
      if (calendarRef.current) {
        calendarRef.current.getApi().changeView(newView)
      }
    }
  
    const getDateRangeText = () => {
      if (view === "timeGridWeek") {
        const startDate = new Date(currentDate)
        startDate.setDate(startDate.getDate() - startDate.getDay() + 1)
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 6) 
        return `${format(startDate, "d")} Jun - ${format(endDate, "d")} Jun 2024`
      } else if (view === "dayGridMonth") {
        return format(currentDate, "MMMM yyyy")
      } else {
        return format(currentDate, "d MMM yyyy")
      }
    }
  
    const calendarOptions = {
      plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
      initialView: "timeGridWeek",
      initialDate: "2024-06-24",
      headerToolbar: false,
      slotMinTime: "08:00:00",
      slotMaxTime: "18:00:00",
      allDaySlot: false,
      height: "auto",
      slotLabelFormat: {
        hour: "numeric",
        minute: "2-digit",
        meridiem: "short",
      },
      eventTimeFormat: {
        hour: "numeric",
        minute: "2-digit",
        meridiem: false,
      },
      dayHeaderFormat: { weekday: "short", day: "numeric" },
      events: events,
      nowIndicator: true,
      editable: true,
      eventDurationEditable: true, 
      selectable: true, 
      selectMirror: true, 
      eventClick: openEditModal, 
      dateClick: openCreateModal, 
      eventDrop: handleEventDrop, 
      eventResize: handleEventResize, 
      eventContent: (eventInfo) => {
        return (
          <div className="p-1 text-xs overflow-hidden  h-full">
            <div className="font-medium border-b border-dashed">{format(new Date(eventInfo.event.start), "h:mm a")}</div>
            <div className="font-medium">{eventInfo.event.title}</div>
          </div>
        )
      },
    }

  
      return (
        <div className="bg-white rounded-lg shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">June 2024</h2>
            <Button variant="outline" size="sm" onClick={handleToday} className="h-8 rounded-sm">
              Today
            </Button>
          </div>
  
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewChange("timeGridDay")}
                className={`rounded-none h-8 ${view === "timeGridDay" ? "bg-muted" : ""}`}
              >
                Day
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewChange("timeGridWeek")}
                className={`rounded-none h-8 ${view === "timeGridWeek" ? "bg-muted" : ""}`}
              >
                Week
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewChange("dayGridMonth")}
                className={`rounded-none h-8 ${view === "dayGridMonth" ? "bg-muted" : ""}`}
              >
                Month
              </Button>
            </div>
  
            <div className="flex items-center gap-2 border rounded-sm py-1.5 px-3">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">{getDateRangeText()}</span>
            </div>
          </div>
        </div>
  
        <div className="flex items-center justify-between border-b">
          <div className="flex">
            <Button variant="ghost" size="sm" onClick={handlePrev} className="rounded-none border-r p-3 h-10">
              ←
            </Button>
            <Button variant="ghost" size="sm" onClick={handleNext} className="rounded-none  border-r p-3 h-10">
              →
            </Button>
          </div>
  
  
        </div>
  
        <div className="p-0">
          <FullCalendar ref={calendarRef} {...calendarOptions} />
        </div>
  
        {isModalOpen && <EventModal />}
      </div>
      );
    };
