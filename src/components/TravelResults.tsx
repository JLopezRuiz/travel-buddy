"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, MapPin, Sun, PlaneIcon } from "lucide-react"
import type { Budget, TravelInterest, TravelStyle } from "@/types/travel"

const mockInput = {
  destination: "Barcelona",
  tripLength: 5,
  budget: "medium" as Budget,
  interests: ["food", "culture", "nightlife"] as TravelInterest[],
  travelStyle: "balanced" as TravelStyle,
}

export const TravelResults = () => {
  // Generate day-by-day itinerary based on trip length
  const generateItinerary = () => {
    const itinerary = []
    for (let i = 1; i <= mockInput.tripLength; i++) {
      itinerary.push({
        day: i,
        title: `Explore ${mockInput.destination}`,
        activities: [
          "Morning: Visit local attractions and landmarks",
          "Afternoon: Enjoy authentic cuisine",
          "Evening: Experience local culture and nightlife",
        ],
      })
    }
    return itinerary
  }

  const itinerary = generateItinerary()

  return (
    <div className="space-y-6">

      <div className="space-y-1 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-balance">Your {mockInput.destination} Adventure Awaits</h2>
        <p className="text-muted-foreground text-lg">Here&apos;s your personalized {mockInput.tripLength}-day itinerary</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 shadow-md">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Best Time to Visit</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The ideal time to visit {mockInput.destination} is during the spring and fall months when the weather is
              pleasant and attractions are less crowded.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-md">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <PlaneIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Best Time to Buy Flights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Book your flights 6-8 weeks in advance for the best deals. Consider flying mid-week for lower prices and
              fewer crowds.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-md">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Recommended Neighborhood</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Stay in the historic downtown area for easy access to major attractions, dining, and entertainment
              options.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-balance">Day-by-Day Itinerary</h3>

        <div className="space-y-3">
          {itinerary.map((day) => (
            <Card key={day.day} className="border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <span className="text-sm font-semibold">{day.day}</span>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">Day {day.day}</CardTitle>
                    <CardDescription className="mt-1">{day.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 pl-13">
                  {day.activities.map((activity, index) => (
                    <li key={index} className="text-sm leading-relaxed text-muted-foreground">
                      • {activity}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-primary/20 bg-secondary/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-semibold text-secondary-foreground">Budget Estimate</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Based on your {mockInput.budget} budget preference, expect to spend approximately $
                {mockInput.budget === "low" ? "50-100" : mockInput.budget === "medium" ? "100-200" : "200-400"} per day including
                accommodation, meals, and activities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
