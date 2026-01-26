import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TravelOutput } from "@/types/travel"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPlanForClipboard = (
  plan: TravelOutput
): string => {
  return `
BEST TIME TO VISIT
${plan.bestTimeToVisit}

FLIGHT ADVICE
${plan.flightAdvice}

WHERE TO STAY
${plan.stayArea}

ITINERARY
${plan.itinerary
  .map(
    (day) =>
      `Day ${day.day}: ${day.title}\n${day.description}`
  )
  .join("\n\n")}
`.trim()
}

