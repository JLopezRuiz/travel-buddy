import type { ItineraryRow } from "@/types/travel"

export const buildItinerary = (rows: ItineraryRow[], tripLength: number): ItineraryRow[] => {
  const expectedSlots = ["Morning", "Afternoon", "Evening"] as const
  const normalized: ItineraryRow[] = []

  for (let day = 1; day <= tripLength; day++) {
    for (const slot of expectedSlots) {
      const match = rows.find(r => r.day === day && r.timeOfDay === slot)
      normalized.push({
        day,
        timeOfDay: slot,
        activity: match?.activity ?? "Free activity",
        location: match?.location ?? "N/A",
        link: match?.link?.trim() || "free"
      })
    }
  }

  return normalized
}
