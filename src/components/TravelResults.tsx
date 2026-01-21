import type { TravelOutput } from "@/types/travel"
import { Button } from "./ui/button"

type TravelResultsProps = {
  data?: TravelOutput | null
  onBack?: () => void
}

export const TravelResults = ({ data, onBack }: TravelResultsProps) => {
  if (!data || !Array.isArray(data.itinerary)) {
    return (
      <div className="text-center">
        <p>We couldn’t generate your itinerary.</p>
        <Button onClick={onBack} className="mt-4">
          Back
        </Button>
      </div>
    )
  }


  const { bestTimeToVisit, flightAdvice, stayArea, itinerary } = data

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold">Best Time to Visit</h2>
        <p>{bestTimeToVisit}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Flight Advice</h2>
        <p>{flightAdvice}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Where to Stay</h2>
        <p>{stayArea}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Itinerary</h2>

        {!Array.isArray(itinerary) ? (
          <p className="text-red-500">
            Itinerary data is missing or invalid.
          </p>
        ) : (
          <ul className="space-y-4">
            {itinerary.map((day) => (
              <li key={day.day}>
                <strong>Day {day.day}: {day.title}</strong>
                <p>{day.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {onBack && (
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
      )}
    </div>
  )
}
