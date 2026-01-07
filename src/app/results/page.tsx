import {TravelResults} from "@/components/TravelResults";

export default function ResultsPage() {
  return (
    <main className="min-h-screen p-8">
        <TravelResults data={{
              destination: "",
              tripLength: 0,
              budget: "",
              interests: [],
              travelStyle: ""
          }} onBack={function (): void {
              throw new Error("Function not implemented.");
          } } />
    </main>
  );
}
