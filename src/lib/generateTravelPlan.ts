import type { TravelInput, TravelOutput } from "@/types/travel"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

export const generateTravelPlan = async (
  input: TravelInput,
): Promise<TravelOutput> => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  const systemPrompt = `
You are a helpful travel assistant. The user is a lazy type-A traveler.
Return only a JSON object exactly matching this schema:

{
  "bestTimeToVisit": "string",
  "flightAdvice": "string",
  "stayArea": "string",
  "itinerary": [
    { "day": 1, "title": "string", "description": "string" }
  ]
}
`

const userPrompt = `
Travel Input:
Destination: ${input.destination}
Trip Length: ${input.tripLength} days
Budget: ${input.budget}
Interests: ${input.interests.join(", ")}
Travel Style: ${input.travelStyle}
`

  try {
    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response  = result.response;
    const rawText = response.text();
    if (!rawText) throw new Error("No response from Gemini")

    // Parse JSON safely
    const data = JSON.parse(rawText) as TravelOutput
    return data
  } catch (err) {
    console.error("Gemini agent error:", err)
    throw err
  }
}
