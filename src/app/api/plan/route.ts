import { NextResponse } from "next/server"
import type { TravelInput, TravelOutput } from "@/types/travel"

export async function POST(req: Request) {
  const body = (await req.json()) as TravelInput

  const mockResponse: TravelOutput = {
    bestTimeToVisit: "April–June and September–October",
    flightAdvice: "Book flights 6–8 weeks in advance.",
    stayArea: "Central neighborhoods close to food and transit.",
    itinerary: [],
  }

  return NextResponse.json(mockResponse)
}
