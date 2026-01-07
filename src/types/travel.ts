export type Budget = "low" | "medium" | "high"

export type TravelStyle = "relaxed" | "balanced" | "packed"

export type TravelInterest =
  | "food"
  | "nature"
  | "culture"
  | "relaxation"
  | "nightlife"

export interface TravelInput {
  destination: string
  tripLength: number
  budget: Budget
  interests: TravelInterest[]
  travelStyle: TravelStyle
}

export interface ItineraryItem {
  day: number
  title: string
  description: string
}

export interface TravelOutput {
  bestTimeToVisit: string
  flightAdvice: string
  stayArea: string
  itinerary: ItineraryItem[]
}
