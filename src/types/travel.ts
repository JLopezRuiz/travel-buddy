export type Budget = "low" | "medium" | "high"

export type TravelStyle = "relaxed" | "balanced" | "packed"

export type TravelInterest =
  | "food"
  | "nature"
  | "culture"
  | "relaxation"
  | "nightlife"

export type ItineraryRow = {
  day: number
  timeOfDay: "Morning" | "Afternoon" | "Evening"
  activity: string
  location: string
  link: string // URL or "free"
}

export interface TravelInput {
  destination: string
  tripLength: number
  budget: Budget
  interests: TravelInterest[]
  travelStyle: TravelStyle
}

export interface TravelOutput {
  bestTimeToVisit: string
  flightAdvice: string
  stayArea: string
  itinerary: ItineraryRow[]
}
