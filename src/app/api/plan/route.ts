import { NextResponse } from "next/server"
import type { TravelInput } from "@/types/travel"
import { generateTravelPlan } from "@/lib/generateTravelPlan"

export const POST = async (req: Request) => {
  try {
    const input = (await req.json()) as TravelInput
    const plan = await generateTravelPlan(input)
    return NextResponse.json(plan)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to generate travel plan" }, { status: 500 })
  }
}
