"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TravelForm } from "@/components/TravelForm"
import { TravelResults } from "@/components/TravelResults"
import type { TravelInput, TravelOutput } from "@/types/travel"

export default function HomePage() {
  const [plan, setPlan] = useState<TravelOutput | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (input: TravelInput) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      const data = await res.json()

      if (!data.success) {
        throw new Error(data.message)
      }

      setPlan(data)
    } catch (err) {
      setError("Something went wrong. Please try again." + err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {!plan ? (
        <TravelForm onSubmit={handleSubmit} />
      ) : (
        <TravelResults data={plan} onBack={() => setPlan(null)} />
      )}

      {loading && (
        <div className="mt-6 text-center text-muted-foreground">
          <p className="text-lg">Creating your personalized itinerary ✈️</p>
          <p className="text-sm mt-1">
            Considering weather, crowds, food, and vibes…
          </p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <Button onClick={() => setPlan(null)}>Try again</Button>
        </div>
      )}


    </div>
  )
}
