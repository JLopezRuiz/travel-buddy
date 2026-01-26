import type { ItineraryItem } from "@/types/travel"

export const Itinerary = ({ itinerary }: { itinerary: ItineraryItem[] }) => {
  if (!itinerary || itinerary.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Itinerary</h2>

      {itinerary.map((day) => (
        <div key={day.day} className="border rounded p-4">
          <h3 className="font-medium">
            Day {day.day}: {day.title}
          </h3>
          <p className="text-muted-foreground mt-1">
            {day.description}
          </p>
        </div>
      ))}
    </div>
  )
}
