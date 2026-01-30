import type { ItineraryRow } from "@/types/travel"

export const ItineraryTable = ({ rows }: { rows: ItineraryRow[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse text-sm">
        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="py-3 px-4">Day</th>
            <th className="py-3 px-4">Time</th>
            <th className="py-3 px-4">Activity</th>
            <th className="py-3 px-4">Location</th>
            <th className="py-3 px-4">Link</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
              <td className="py-2 px-4 font-medium">{row.day}</td>
              <td className="py-2 px-4">{row.timeOfDay}</td>
              <td className="py-2 px-4">{row.activity}</td>
              <td className="py-2 px-4">{row.location}</td>
              <td className="py-2 px-4">
                {row.link === "free" ? (
                  <span className="text-muted-foreground">Free</span>
                ) : (
                  <a
                    href={row.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Tickets
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

