import type { TravelInput, TravelOutput } from "@/types/travel"
import { generateTravelPlan } from "../generateTravelPlan"

export const travelBuddyAgent = async (
  input: TravelInput
): Promise<TravelOutput> => {
  const plan = await generateTravelPlan(input)

  return {
    ...plan,
    itinerary: plan.itinerary.slice(0, input.tripLength),
  }
}
