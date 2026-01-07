"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Plane } from "lucide-react"

const INTERESTS = [
  { id: "food", label: "Food" },
  { id: "nature", label: "Nature" },
  { id: "culture", label: "Culture" },
  { id: "relaxation", label: "Relaxation" },
  { id: "nightlife", label: "Nightlife" },
]

export function TravelForm() {
  const [destination, setDestination] = useState("")
  const [tripLength, setTripLength] = useState("")
  const [budget, setBudget] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [travelStyle, setTravelStyle] = useState("")
  const router = useRouter()


  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, interestId])
    } else {
      setInterests(interests.filter((id) => id !== interestId))
    }
  }

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  router.push("/results")
}

  const isFormValid = destination && tripLength && budget && interests.length > 0 && travelStyle

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Plan Your Trip</CardTitle>
        <CardDescription className="text-base">
          Tell us about your travel preferences and we&apos;ll help you plan the perfect itinerary
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-base">
              Destination
            </Label>
            <Input
              id="destination"
              placeholder="Where would you like to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tripLength" className="text-base">
              Trip Length (days)
            </Label>
            <Input
              id="tripLength"
              type="number"
              min="1"
              placeholder="How many days?"
              value={tripLength}
              onChange={(e) => setTripLength(e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-base">
              Budget
            </Label>
            <Select value={budget} onValueChange={setBudget} required>
              <SelectTrigger id="budget" className="h-11">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Budget-friendly options</SelectItem>
                <SelectItem value="medium">Medium - Balanced experience</SelectItem>
                <SelectItem value="high">High - Premium experience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-base">Travel Interests</Label>
            <div className="space-y-3">
              {INTERESTS.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={interest.id}
                    checked={interests.includes(interest.id)}
                    onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                  />
                  <Label
                    htmlFor={interest.id}
                    className="cursor-pointer text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {interest.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base">Travel Style</Label>
            <RadioGroup value={travelStyle} onValueChange={setTravelStyle} required>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="relaxed" id="relaxed" />
                <Label htmlFor="relaxed" className="cursor-pointer text-base font-normal">
                  Relaxed - Take it easy and enjoy
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="balanced" id="balanced" />
                <Label htmlFor="balanced" className="cursor-pointer text-base font-normal">
                  Balanced - Mix of activities and rest
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="packed" id="packed" />
                <Label htmlFor="packed" className="cursor-pointer text-base font-normal">
                  Packed - See and do as much as possible
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" size="lg" className="w-full text-base" disabled={!isFormValid}>
            <Plane className="mr-2 h-5 w-5" />
            Plan My Trip
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
