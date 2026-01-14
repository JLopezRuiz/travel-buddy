import type { TravelInput, TravelOutput } from "@/types/travel"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

const extractJSON = (text: string): string => {
  const firstBrace = text.indexOf("{")
  const lastBrace = text.lastIndexOf("}")
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON object found in response")
  }
  return text.slice(firstBrace, lastBrace + 1)
}

const systemPrompt = `
You are an expert travel planner for lazy type-A travelers.

You MUST respond with ONLY valid JSON.
Do NOT include markdown or extra text.

JSON schema:

{
  "bestTimeToVisit": "string",
  "flightAdvice": "string",
  "stayArea": "string",
  "itinerary": [
    { "day": number, "title": "string", "description": "string" }
  ]
}

Travel intelligence rules:

Best Time to Visit:
- Consider weather, peak vs shoulder season, and crowds.
- Mention specific months, not vague seasons.

Flight Advice:
- Domestic trips: suggest booking 4–8 weeks in advance.
- International trips:
  - Europe: 8–12 weeks
  - Asia: 10–16 weeks
  - Latin America: 6–10 weeks
- Mention best days of week to buy when relevant.

Where to Stay:
- Recommend neighborhoods, not specific hotels.
- Adjust advice based on budget and travel style.
- Prioritize safety, walkability, and transit access.

Itinerary:
- Match the number of days exactly to the trip length.
- Balance activities based on travel style:
  - Relaxed: fewer activities per day
  - Packed: fuller days
- Emphasize interests strongly (food, culture, nature, etc.).

Output rules:
- Exact JSON only.
- Concise, helpful language.
`

export const generateTravelPlan = async (
  input: TravelInput,
): Promise<TravelOutput> => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })
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
