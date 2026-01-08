"use client"
import { useState } from "react"
import { TravelForm } from "@/components/TravelForm"
import { TravelResults } from "@/components/TravelResults"
import type { TravelInput, TravelOutput } from "@/types/travel"

export default function HomePage() {
  const [plan, setPlan] = useState<TravelOutput | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (input: TravelInput) => {
    setLoading(true)
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      const data = (await res.json()) as TravelOutput
      setPlan(data)
    } catch (err) {
      console.error(err)
      alert("Failed to generate travel plan")
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

      {loading && <p className="text-center mt-4">Generating your plan… ✈️</p>}
    </div>
  )
}
