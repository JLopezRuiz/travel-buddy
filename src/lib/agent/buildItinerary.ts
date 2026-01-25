import type { ItineraryItem, TravelInput } from "@/types/travel"

export const buildItinerary = (
  rawItinerary: ItineraryItem[] | undefined,
  input: TravelInput
): ItineraryItem[] => {
  if (!Array.isArray(rawItinerary)) return []

  return rawItinerary
    .slice(0, input.tripLength)
    .map((day, index) => ({
      ...day,
      day: index + 1,
    }))
}
