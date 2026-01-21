import type { TravelOutput } from "@/types/travel"
import { Button } from "./ui/button"
import { Section } from "./ui/section"
import { Itinerary } from "./Itinerary"

type TravelResultsProps = {
  data?: TravelOutput | null
  onBack?: () => void
}

export const TravelResults = ({ data, onBack }: TravelResultsProps) => {
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

      <div className="text-center">
        <Button onClick={onBack}>Plan another trip</Button>
      </div>
    </div>
  )
}

