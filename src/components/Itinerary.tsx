import { useEffect, useState } from "react"
import type { ItineraryItem } from "@/types/travel"

export const Itinerary = ({ itinerary }: { itinerary: ItineraryItem[] }) => {
  const [visibleDays, setVisibleDays] = useState(() => Math.min(1, itinerary.length))
  
  // Animate the reveal of itinerary days
  useEffect(() => {
    if (visibleDays >= itinerary.length) return

    const timer = setTimeout(() => {
      setVisibleDays((v) => v + 1)
    }, 600)

    return () => clearTimeout(timer)
  }, [visibleDays, itinerary.length])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Itinerary</h2>

      {itinerary.slice(0, visibleDays).map((day) => (
        <div key={day.day} className="border rounded p-4">
          <h3 className="font-medium">
            Day {day.day}: {day.title}
          </h3>
          <p className="text-muted-foreground mt-1">
            {day.description}
          </p>
        </div>
      ))}

      {visibleDays < itinerary.length && (
        <p className="text-sm text-muted-foreground">
          Building the rest of your trip…
        </p>
      )}
    </div>
  )
}
