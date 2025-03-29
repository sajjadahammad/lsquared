"use client"

import { useState, useEffect } from "react"
import { useCalendar } from "@/context/CalendarProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { format, parseISO } from "date-fns"

export default function EventModal() {
  const { selectedEvent, isModalOpen, modalMode, eventCategories, addEvent, updateEvent, deleteEvent, closeModal } =useCalendar()

  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    categoryId: "design",
    backgroundColor: "",
    borderColor: "",
    textColor: "",
  })

  useEffect(() => {
    if (selectedEvent) {

      if (modalMode === "create") {
        const startDate = parseISO(selectedEvent.start)

        setFormData({
          title: "",
          start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
          categoryId: selectedEvent.id || "design",
          backgroundColor: selectedEvent.backgroundColor,
          borderColor: selectedEvent.borderColor,
          textColor: selectedEvent.textColor,
        })
      } else {
        const startDate = parseISO(selectedEvent.start)

        const category =
          eventCategories.find((cat) => cat.backgroundColor === selectedEvent.backgroundColor) || eventCategories[0]

        setFormData({
          id: selectedEvent.id,
          title: selectedEvent.title,
          start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
          categoryId: category.id,
          backgroundColor: selectedEvent.backgroundColor,
          borderColor: selectedEvent.borderColor,
          textColor: selectedEvent.textColor,
        })
      }
    }
  }, [selectedEvent, modalMode, eventCategories])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCategoryChange = (value) => {
    const category = eventCategories.find((cat) => cat.id === value)
    if (category) {
      setFormData({
        ...formData,
        categoryId: value,
        backgroundColor: category.backgroundColor,
        borderColor: category.borderColor,
        textColor: category.textColor,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const eventData = {
      id: formData.id,
      title: formData.title,
      start: formData.start,
      backgroundColor: formData.backgroundColor,
      borderColor: formData.borderColor,
      textColor: formData.textColor,
    }

    if (modalMode === "create") {
      addEvent(eventData)
    } else {
      updateEvent(eventData)
    }

    closeModal()
  }

  const handleDelete = () => {
    if (formData.id) {
      deleteEvent(formData.id)
      closeModal()
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px] font-poppins">
        <DialogHeader>
          <DialogTitle>{modalMode === "create" ? "Create New Event" : "Edit Event"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start">Start Time</Label>
            <Input
              id="start"
              name="start"
              type="datetime-local"
              value={formData.start}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Event Category</Label>
            <RadioGroup
              value={formData.categoryId}
              onValueChange={handleCategoryChange}
              className="flex flex-col space-y-1"
            >
              {eventCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={category.id}
                    id={category.id}
                    className="border-2"
                    style={{
                      borderColor: category.borderColor,
                      backgroundColor: category.backgroundColor,
                    }}
                  />
                  <Label htmlFor={category.id}>{category.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter className="flex justify-between items-center pt-4">
            {modalMode === "edit" && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit">{modalMode === "create" ? "Create" : "Update"}</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

