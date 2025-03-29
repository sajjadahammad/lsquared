"use client"

import { createContext, useState, useContext } from "react"

const CalendarContext = createContext()

export function CalendarProvider({ children }) {
  const [events, setEvents] = useState([

    {
      id: "1",
      title: "Client Presentation Preparation",
      start: "2024-06-25T08:00:00",
      end: "2024-06-25T09:00:00",
      backgroundColor: "#e9d5ff",
      borderColor: "#d8b4fe",
      textColor: "#581c87",
    },
    {
      id: "2",
      title: "Client Meeting Planning",
      start: "2024-06-24T09:00:00",
      end: "2024-06-24T10:30:00",
      backgroundColor: "#dbeafe",
      borderColor: "#bfdbfe",
      textColor: "#1e40af",
    },
    {
      id: "3",
      title: "Meetup with UI8 internal Team",
      start: "2024-06-24T11:00:00",
      end: "2024-06-24T12:00:00",
      backgroundColor: "#dcfce7",
      borderColor: "#bbf7d0",
      textColor: "#166534",
    },

    {
      id: "4",
      title: "Design Revisions",
      start: "2024-06-25T09:00:00",
      end: "2024-06-25T10:00:00",
      backgroundColor: "#e9d5ff",
      borderColor: "#d8b4fe",
      textColor: "#581c87",
    },
    {
      id: "5",
      title: "Client Feedback Meeting",
      start: "2024-06-25T11:00:00",
      end: "2024-06-25T12:30:00",
      backgroundColor: "#dbeafe",
      borderColor: "#bfdbfe",
      textColor: "#1e40af",
    },

    {
      id: "6",
      title: "New Project Kickoff Meeting",
      start: "2024-06-26T08:00:00",
      end: "2024-06-26T09:00:00",
      backgroundColor: "#dbeafe",
      borderColor: "#bfdbfe",
      textColor: "#1e40af",
    },
    {
      id: "7",
      title: "Collaboration with Development Team",
      start: "2024-06-26T10:00:00",
      end: "2024-06-26T11:00:00",
      backgroundColor: "#e9d5ff",
      borderColor: "#d8b4fe",
      textColor: "#581c87",
    },
    {
      id: "8",
      title: "Meetup with Gojek internal team",
      start: "2024-06-26T12:00:00",
      end: "2024-06-26T13:00:00",
      backgroundColor: "#dcfce7",
      borderColor: "#bbf7d0",
      textColor: "#166534",
    },
    {
      id: "9",
      title: "Client Meeting Progress report",
      start: "2024-06-27T12:00:00",
      end: "2024-06-27T13:30:00",
      backgroundColor: "#dbeafe",
      borderColor: "#bfdbfe",
      textColor: "#1e40af",
    },
    {
      id: "10",
      title: "Design Refinement",
      start: "2024-06-27T09:00:00",
      end: "2024-06-27T10:00:00",
      backgroundColor: "#e9d5ff",
      borderColor: "#d8b4fe",
      textColor: "#581c87",
    },

    {
      id: "11",
      title: "Design Team Stand-up Meeting",
      start: "2024-06-28T08:30:00",
      end: "2024-06-28T10:00:00",
      backgroundColor: "#dbeafe",
      borderColor: "#bfdbfe",
      textColor: "#1e40af",
    },
    {
      id: "12",
      title: "Final Touches on Client Project",
      start: "2024-06-28T09:00:00",
      end: "2024-06-28T10:00:00",
      backgroundColor: "#e9d5ff",
      borderColor: "#d8b4fe",
      textColor: "#581c87",
    },
    {
      id: "13",
      title: "Industry Webinar/Workshop",
      start: "2024-06-28T11:00:00",
      end: "2024-06-28T12:00:00",
      backgroundColor: "#dcfce7",
      borderColor: "#bbf7d0",
      textColor: "#166534",
    },

    // Saturday events
    {
      id: "14",
      title: "Planning & Goal Setting for the Week",
      start: "2024-06-29T09:00:00",
      end: "2024-06-29T10:00:00",
      backgroundColor: "#e9d5ff",
      borderColor: "#d8b4fe",
      textColor: "#581c87",
    },

    // Sunday events
    {
      id: "15",
      title: "Meetup with Adobe internal team",
      start: "2024-06-30T10:00:00",
      end: "2024-06-30T11:00:00",
      backgroundColor: "#dcfce7",
      borderColor: "#bbf7d0",
      textColor: "#166534",
    },
  ])

  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("create")

  // Event categories with their colors
  const eventCategories = [
    {
      id: "design",
      name: "Design",
      backgroundColor: "#e9d5ff",
      borderColor: "#d8b4fe",
      textColor: "#581c87",
    },
    {
      id: "client",
      name: "Client Meeting",
      backgroundColor: "#dbeafe",
      borderColor: "#bfdbfe",
      textColor: "#1e40af",
    },
    {
      id: "meetup",
      name: "Team Meetup",
      backgroundColor: "#dcfce7",
      borderColor: "#bbf7d0",
      textColor: "#166534",
    },
  ]

  const addEvent = (newEvent) => {
    const startDate = new Date(newEvent.start)
    const endDate = new Date(startDate)
    endDate.setHours(endDate.getHours() + 1)

    const eventWithId = {
      ...newEvent,
      id: Date.now().toString(),
      end: endDate.toISOString(), 
    }
    setEvents([...events, eventWithId])
  }

  const updateEvent = (updatedEvent) => {
    setEvents(
      events.map((event) => {
        if (event.id === updatedEvent.id) {
          if (updatedEvent.start && !updatedEvent.end) {
            const startDate = new Date(updatedEvent.start)
            const oldEvent = events.find((e) => e.id === updatedEvent.id)

            let duration = 60 * 60 * 1000 
            if (oldEvent && oldEvent.end) {
              const oldStart = new Date(oldEvent.start)
              const oldEnd = new Date(oldEvent.end)
              duration = oldEnd.getTime() - oldStart.getTime()
            }

            const endDate = new Date(startDate.getTime() + duration)
            return {
              ...updatedEvent,
              end: endDate.toISOString(),
            }
          }
          return updatedEvent
        }
        return event
      }),
    )
  }

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  const openCreateModal = (dateInfo) => {
    setSelectedEvent({
      start: dateInfo.dateStr,
      end: dateInfo.dateStr,
      allDay: dateInfo.allDay,
      ...eventCategories[0],
    })
    setModalMode("create")
    setIsModalOpen(true)
  }

  const openEditModal = (eventInfo) => {

    setSelectedEvent(
      eventInfo.event.toPlainObject({
        collapseExtendedProps: true,
      }),
    )
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const handleEventDrop = (dropInfo) => {
    const { event } = dropInfo

    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor,
      textColor: event.textColor,
    }

    updateEvent(updatedEvent)
  }

  const handleEventResize = (resizeInfo) => {
    const { event } = resizeInfo

    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor,
      textColor: event.textColor,
    }

    updateEvent(updatedEvent)
  }

  return (
    <CalendarContext.Provider
      value={{
        events,
        selectedEvent,
        isModalOpen,
        modalMode,
        eventCategories,
        addEvent,
        updateEvent,
        deleteEvent,
        openCreateModal,
        openEditModal,
        closeModal,
        handleEventDrop,
        handleEventResize,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendar() {
  return useContext(CalendarContext)
}

