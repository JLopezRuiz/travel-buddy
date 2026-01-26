import type { TravelOutput } from "@/types/travel"
import { Button } from "./ui/button"
import { Section } from "./ui/section"
import { Itinerary } from "./Itinerary"
import { formatPlanForClipboard } from "@/lib/utils"
import { useState } from "react"

type TravelResultsProps = {
  data?: TravelOutput | null
  onBack?: () => void
}

export const TravelResults = ({ data, onBack }: TravelResultsProps) => {
  const [copied, setCopied] = useState(false)

  if (!data || !Array.isArray(data.itinerary)) {
    return (
      <div className="text-center">
        <p>We couldn’t generate your itinerary.</p>
        <Button onClick={onBack} className="mt-4">
          Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Section title="Best Time to Visit">
        {data.bestTimeToVisit}
      </Section>

      <Section title="Flight Advice">
        {data.flightAdvice}
      </Section>

      <Section title="Where to Stay">
        {data.stayArea}
      </Section>

      <Itinerary itinerary={data.itinerary} />

      <div className="text-center flex gap-4 justify-center">
        <Button
          variant="outline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(formatPlanForClipboard(data))
              setCopied(true)
              // Optional: reset text after a few seconds
              setTimeout(() => setCopied(false), 2000)
            } catch (err) {
              console.error('Failed to copy:', err)
            }
          }}
        >
          {copied ? 'Copied to Clipboard' : 'Copy itinerary'}
        </Button>

        <Button onClick={onBack}>Plan another trip</Button>
      </div>
    </div>
  )
}

