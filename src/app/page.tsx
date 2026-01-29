"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TravelForm } from "@/components/TravelForm"
import { TravelResults } from "@/components/TravelResults"
import type { TravelInput, TravelOutput } from "@/types/travel"

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)
  const [plan, setPlan] = useState<TravelOutput | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Persist plan to localStorage
  useEffect(() => {
    if (plan) {
      localStorage.setItem("latestPlan", JSON.stringify(plan))
    }
  }, [plan])

  // Load plan from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("latestPlan")
    if (saved) {
      setPlan(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = async (input: TravelInput) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      const data = (await res.json()) as TravelOutput

      setPlan(data)

    } catch (err) {
      setError("Something went wrong. Please try again. " + err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {!showForm && !plan && !loading && (
        <div className="text-center py-24">
          <h1 className="text-4xl font-bold mb-4">
            Travel Buddy ✨
          </h1>
          <p className="text-muted-foreground mb-8">
            A stress-free itinerary for busy Type-A travelers
          </p>
          <Button
            size="lg"
            onClick={() => setShowForm(true)}
          >
            Plan my trip
          </Button>
        </div>
      )}

      {showForm && !plan && !loading && (
        <TravelForm onSubmit={handleSubmit} />
      )}
      
      <div className="flex min-h-screen flex-col items-center justify-center">
        {loading && (
          <div className="text-center text-muted-foreground">
            <p className="text-lg">Creating your personalized itinerary ✈️</p>
            <p className="mt-1 text-sm">
              Considering weather, crowds, food, and vibes…
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <Button onClick={() => setPlan(null)}>Try again</Button>
        </div>
      )}

      {plan && (
        <TravelResults
          data={plan}
          onBack={() => {
            setPlan(null)
            setShowForm(false)
          }}

        />
      )}
    </div>
  )
}
