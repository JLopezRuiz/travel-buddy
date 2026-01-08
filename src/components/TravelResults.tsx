"use client"

import {TravelOutput} from "@/types/travel"

interface TravelResultsProps {
  data: TravelOutput
  onBack: () => void
}

export const TravelResults = ({ data, onBack }: TravelResultsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Your Travel Plan</h2>
      <p><strong>Best Time to Visit:</strong> {data.bestTimeToVisit}</p>
      <p><strong>Flight Advice:</strong> {data.flightAdvice}</p>
      <p><strong>Where to Stay:</strong> {data.stayArea}</p>

      <h3 className="text-xl font-semibold mt-4">Itinerary</h3>
      <ul>
        {data.itinerary.map((item) => (
          <li key={item.day}>
            <strong>Day {item.day}:</strong> {item.title} — {item.description}
          </li>
        ))}
      </ul>

      <button onClick={onBack} className="mt-4 px-4 py-2 bg-gray-200 rounded">
        Back
      </button>
    </div>
  )
}

