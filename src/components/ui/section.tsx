type SectionProps = {
  title: string
  children: React.ReactNode
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground">{children}</p>
    </div>
  )
}
