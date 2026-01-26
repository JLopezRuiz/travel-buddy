import type { TravelInput, TravelOutput } from "@/types/travel"
import { travelPlanPrompt } from "./prompts/travelPlanPrompt"
import { geminiModel } from "../gemini"

const extractJSON = (text: string): string => {
  const firstBrace = text.indexOf("{")
  const lastBrace = text.lastIndexOf("}")
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON object found in response")
  }
  return text.slice(firstBrace, lastBrace + 1)
}

export const generateTravelPlan = async (
  input: TravelInput,
): Promise<TravelOutput> => {
  
  const model = geminiModel

  const userPrompt = `
Travel Input:
Destination: ${input.destination}
Trip Length: ${input.tripLength} days
Budget: ${input.budget}
Interests: ${input.interests.join(", ")}
Travel Style: ${input.travelStyle}
`

  try {
    const result = await model.generateContent([travelPlanPrompt, userPrompt]);
    const response = result.response;
    const rawText = response.text();

    if (!rawText) throw new Error("No response from Gemini")

    // Parse JSON safely
    const jsonString = extractJSON(rawText)
    const data = JSON.parse(jsonString) as TravelOutput
    // Final safety normalization
    data.itinerary = data.itinerary
      .slice(0, input.tripLength)
      .map((item, index) => ({
        ...item,
        day: index + 1,
      }))
    console.log("PARSED OUTPUT:", data)
    console.log("ITINERARY TYPE:", Array.isArray(data.itinerary))

    return data
  } catch (err) {
    console.error("Gemini agent error:", err)
    throw err
  }
}
