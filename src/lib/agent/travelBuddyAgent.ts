import type { TravelInput, TravelOutput } from "@/types/travel"
import { generateTravelPlan } from "../generateTravelPlan"
import { buildItinerary } from "./buildItinerary"

export const travelBuddyAgent = async (
  input: TravelInput
): Promise<TravelOutput> => {
  const plan = await generateTravelPlan(input)

  return {
    ...plan,
    itinerary: buildItinerary(plan.itinerary, input),
  }
}
