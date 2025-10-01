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
        <p className="text-sm text-muted-foreground hidden lg:block">Tap any point to jump through time</p>
      </div>

      {/* Mobile/Tablet: Vertical Timeline */}
      <div className="lg:hidden space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {events.map((event, index) => (
          <button
            key={index}
            onClick={() => onEventSelect(index)}
            className={`
              w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 text-left
              ${
                index === currentIndex
                  ? "bg-primary/10 border-2 border-primary shadow-lg scale-[1.02]"
                  : "bg-card border border-border hover:border-primary/50 hover:bg-muted/50"
              }
            `}
          >
            {/* Timeline dot */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div
                className={`
                  w-4 h-4 rounded-full transition-all duration-300
                  ${
                    index === currentIndex
                      ? `${getCategoryColor(event.category)} ring-4 ring-primary/30 scale-125`
                      : index < currentIndex
                        ? `${getCategoryColor(event.category)}`
                        : "bg-muted"
                  }
                `}
              />
              {index < events.length - 1 && (
                <div
                  className={`w-0.5 h-8 transition-colors duration-300 ${
                    index < currentIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>

            {/* Event info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-primary mb-1">
                {Number(event.year) < 0
                  ? `${Math.abs(Number(event.year))} BCE`
                  : event.year < 1000
                    ? `${event.year} CE`
                    : event.year.toString()}
              </div>
              <div
                className={`text-base font-semibold transition-colors ${
                  index === currentIndex ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {event.title}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block relative overflow-x-auto scrollbar-hide pb-4">
        <div className="relative min-w-full px-4">
          {/* Background line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-border rounded-full transform -translate-y-1/2" />

          {/* Progress line */}
          <div
            className="absolute top-1/2 left-4 h-1 bg-primary rounded-full transform -translate-y-1/2 transition-all duration-500"
            style={{
              width: `calc(${(currentIndex / (events.length - 1)) * 100}% - 1rem)`,
              maxWidth: "calc(100% - 2rem)",
            }}
          />

          {/* Event points */}
          <div className="relative flex justify-between items-center py-12">
            {events.map((event, index) => (
              <div key={index} className="flex flex-col items-center group flex-shrink-0">
                {/* Year and title label */}
                <div className="flex flex-col items-center gap-1 mb-6">
                  <div
                    className={`
                      text-xs font-medium transition-all duration-300 text-center whitespace-nowrap px-2 py-1 rounded
                      ${
                        index === currentIndex
                          ? "text-primary font-bold scale-110 bg-primary/10"
                          : "text-muted-foreground group-hover:text-foreground group-hover:bg-muted/50"
                      }
                    `}
                  >
                    {Number(event.year) < 0
                      ? `${Math.abs(Number(event.year))} BCE`
                      : event.year < 1000
                        ? `${event.year} CE`
                        : event.year.toString()}
                  </div>

                  <div
                    className={`
                      text-xs text-center whitespace-nowrap px-2 py-1 rounded max-w-[120px]
                      transition-all duration-300
                      ${
                        index === currentIndex
                          ? "opacity-100 text-foreground font-semibold"
                          : "opacity-0 group-hover:opacity-100 text-muted-foreground"
                      }
                    `}
                  >
                    {event.title}
                  </div>
                </div>

                {/* Event point button */}
                <Button
                  onClick={() => onEventSelect(index)}
                  variant="ghost"
                  size="sm"
                  className={`
                    w-5 h-5 rounded-full p-0 transition-all duration-300 hover:scale-150 relative z-10
                    ${
                      index === currentIndex
                        ? `${getCategoryColor(event.category)} ring-4 ring-primary/30 scale-150 shadow-lg`
                        : index <= currentIndex
                          ? `${getCategoryColor(event.category)} hover:ring-2 hover:ring-primary/20`
                          : "bg-muted hover:bg-muted-foreground/30"
                    }
                  `}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
