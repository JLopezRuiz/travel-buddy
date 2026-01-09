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


export const generateTravelPlan = async (
  input: TravelInput,
): Promise<TravelOutput> => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  const systemPrompt = `
You are a highly organized travel assistant for lazy type-A travelers.

You MUST respond with ONLY valid JSON.
Do NOT include markdown, comments, or extra text.

The JSON MUST match this exact schema:

{
  "bestTimeToVisit": "string",
  "flightAdvice": "string",
  "stayArea": "string",
  "itinerary": [
    { "day": number, "title": "string", "description": "string" }
  ]
}

Rules:
- The itinerary array MUST contain exactly ${input.tripLength} items.
- Days MUST be numbered starting at 1 and increment by 1.
- Descriptions should be concise (max 2 sentences).
- Tailor recommendations to budget, interests, and travel style.
`;

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
    const jsonString = extractJSON(rawText)
    const data = JSON.parse(jsonString) as TravelOutput
    // Final safety normalization
    // data.itinerary = data.itinerary
    //   .slice(0, input.tripLength)
    //   .map((item, index) => ({
    //     ...item,
    //     day: index + 1,
    //   }))
    return data
  } catch (err) {
    console.error("Gemini agent error:", err)
    throw err
  }
}
