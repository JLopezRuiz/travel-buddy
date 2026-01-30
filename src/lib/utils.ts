import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TravelOutput, ItineraryRow } from "@/types/travel"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPlanForClipboard = (plan: TravelOutput): string => {
  // Group itinerary rows by day
  const days: Record<number, ItineraryRow[]> = {}
  plan.itinerary.forEach((row) => {
    if (!days[row.day]) days[row.day] = []
    days[row.day].push(row)
  })

  const itineraryText = Object.keys(days)
    .sort((a, b) => Number(a) - Number(b))
    .map((dayNum) => {
      const rows = days[Number(dayNum)]
      const dayText = rows
        .map(
          (r) =>
            `${r.timeOfDay}: ${r.activity} @ ${r.location} (${r.link === "free" ? "Free" : r.link
            })`
        )
        .join("\n")
      return `Day ${dayNum}:\n${dayText}`
    })
    .join("\n\n")

  return `
BEST TIME TO VISIT
${plan.bestTimeToVisit}

FLIGHT ADVICE
${plan.flightAdvice}

WHERE TO STAY
${plan.stayArea}

ITINERARY
${itineraryText}
  `.trim()
}


