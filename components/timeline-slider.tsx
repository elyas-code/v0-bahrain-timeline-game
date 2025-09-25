"use client"

import { Button } from "@/components/ui/button"

interface TimelineEvent {
  year: number
  title: string
  category: string
}

interface TimelineSliderProps {
  events: TimelineEvent[]
  currentIndex: number
  onEventSelect: (index: number) => void
}

export function TimelineSlider({ events, currentIndex, onEventSelect }: TimelineSliderProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ancient":
        return "bg-chart-4"
      case "trade":
        return "bg-chart-2"
      case "independence":
        return "bg-chart-1"
      case "modern":
        return "bg-chart-3"
      case "development":
        return "bg-chart-5"
      case "future":
        return "bg-accent pulse-glow"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Timeline Navigation</h3>
        <p className="text-sm text-muted-foreground">Tap any point to jump through time</p>
      </div>

      {/* Timeline Track */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-border rounded-full transform -translate-y-1/2" />

        {/* Progress line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-primary rounded-full transform -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentIndex / (events.length - 1)) * 100}%` }}
        />

        {/* Event points */}
        <div className="relative flex justify-between items-center py-4">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col items-center group">
              <Button
                onClick={() => onEventSelect(index)}
                variant="ghost"
                size="sm"
                className={`
                  w-4 h-4 rounded-full p-0 transition-all duration-300 hover:scale-125
                  ${
                    index === currentIndex
                      ? `${getCategoryColor(event.category)} ring-4 ring-primary/30 scale-125`
                      : index <= currentIndex
                        ? getCategoryColor(event.category)
                        : "bg-muted hover:bg-muted-foreground/20"
                  }
                `}
              />

              {/* Year label */}
              <div
                className={`
                mt-2 text-xs transition-all duration-300 text-center
                ${
                  index === currentIndex
                    ? "text-primary font-semibold scale-110"
                    : "text-muted-foreground group-hover:text-foreground"
                }
              `}
              >
                {event.year === 3000 ? "3000 BCE" : event.year < 1000 ? `${event.year} CE` : event.year.toString()}
              </div>

              {/* Title on hover/active */}
              <div
                className={`
                absolute top-8 mt-4 px-2 py-1 bg-popover border border-border rounded text-xs whitespace-nowrap
                transition-all duration-300 pointer-events-none z-10
                opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
              `}
              >
                {event.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
