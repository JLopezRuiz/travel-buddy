import { NextResponse } from "next/server"
import { generateTravelPlan } from "@/lib/generateTravelPlan"
import type { TravelInput } from "@/types/travel"

export const POST = async (req: Request) => {
  try {
    const input = (await req.json()) as TravelInput
    const plan = await generateTravelPlan(input)
    return NextResponse.json(plan)
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn’t generate your travel plan this time. Please try again.",
      },
      { status: 200 }
    )
  }
}
