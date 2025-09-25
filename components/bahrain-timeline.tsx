"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Trophy,
  Lightbulb,
  Building,
  Leaf,
  Crown,
  Ship,
  Factory,
  Landmark,
  Zap,
} from "lucide-react"
import { TimelineSlider } from "./timeline-slider"
import { FutureQuiz } from "./future-quiz"

interface TimelineEvent {
  year: number
  title: string
  description: string
  details: string
  category: "ancient" | "trade" | "modern" | "independence" | "development" | "future"
  icon: React.ReactNode
  image?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 3000,
    title: "Ancient Dilmun Civilization",
    description:
      "Bahrain becomes the center of the ancient Dilmun trading civilization, connecting Mesopotamia with the Indus Valley.",
    details:
      "The Dilmun civilization flourished as a major trading hub, controlling maritime routes between ancient Mesopotamia and the Indus Valley. Archaeological evidence shows sophisticated urban planning, with the Barbar Temple complex serving as a religious center. Dilmun was known for its fresh water springs, pearl diving, and as the 'Land of the Living' in Mesopotamian mythology. The civilization developed advanced metallurgy, pottery, and seal-making techniques that influenced the entire Gulf region.",
    category: "ancient",
    icon: <Landmark className="w-6 h-6" />,
  },
  {
    year: 2000,
    title: "Tylos Period",
    description: "Greeks name the island Tylos, establishing it as an important center for pearl diving and trade.",
    details:
      "Under Greek influence, Bahrain became known as Tylos, famous throughout the ancient world for its exceptional pearls. The island developed sophisticated pearl diving techniques and established trade networks extending to India, Persia, and the Mediterranean. Greek geographers like Strabo documented the island's wealth and strategic importance. The period saw the introduction of new architectural styles, coinage systems, and cultural practices that blended Hellenistic and local traditions.",
    category: "ancient",
    icon: <Building className="w-6 h-6" />,
  },
  {
    year: 629,
    title: "Islamic Conquest",
    description: "Bahrain peacefully converts to Islam, becoming one of the first regions to embrace the new faith.",
    details:
      "The Al-Ala ibn al-Hadrami expedition brought Islam to Bahrain without bloodshed, making it one of the earliest Islamic territories. The local ruler, Al-Mundhir ibn Sawa, converted to Islam and maintained his position, establishing a model of peaceful transition. This period saw the construction of the first mosques, the establishment of Islamic law, and the integration of Bahrain into the expanding Islamic empire. The island became a launching point for further Islamic expansion into the Gulf region.",
    category: "ancient",
    icon: <Crown className="w-6 h-6" />,
  },
  {
    year: 1521,
    title: "Portuguese Occupation",
    description: "Portuguese forces capture Bahrain, beginning European colonial influence in the Gulf region.",
    details:
      "The Portuguese conquest of Bahrain marked the beginning of European colonialism in the Gulf. Led by António Correia, the Portuguese built the Qal'at al-Bahrain fort and established a naval base to control trade routes to India. They imposed heavy taxes on pearl diving and trade, leading to local resistance. The Portuguese introduced new military technologies, architectural styles, and administrative systems. Their rule lasted until 1602, when they were expelled by Safavid Persian forces with local support.",
    category: "trade",
    icon: <Ship className="w-6 h-6" />,
  },
  {
    year: 1602,
    title: "Persian Rule",
    description: "Safavid Persians, with local support, expel the Portuguese and establish control over Bahrain.",
    details:
      "The Safavid conquest ended Portuguese rule and established Persian dominance over Bahrain for nearly two centuries. The Persians appointed local governors and allowed greater autonomy than the Portuguese. This period saw the revival of pearl diving, the expansion of date cultivation, and the strengthening of trade links with Persia and India. The Persians built new fortifications, mosques, and administrative buildings. However, their rule was often challenged by local tribes and Ottoman expansion in the region.",
    category: "trade",
    icon: <Crown className="w-6 h-6" />,
  },
  {
    year: 1783,
    title: "Al Khalifa Dynasty Established",
    description:
      "The Al Khalifa family conquers Bahrain from the Persians, founding the dynasty that rules to this day.",
    details:
      "Ahmed ibn Muhammad ibn Khalifa led the Utub tribal confederation in conquering Bahrain from Persian rule, establishing the Al Khalifa dynasty. The conquest was achieved through a combination of naval warfare and strategic alliances with local tribes. The Al Khalifa established Manama as their capital and created a more decentralized system of governance. They revitalized the pearl diving industry, encouraged trade, and established diplomatic relations with the Ottoman Empire and European powers. This marked the beginning of modern Bahraini statehood.",
    category: "independence",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    year: 1820,
    title: "British Protection Treaty",
    description: "Bahrain signs the General Treaty of Peace with Britain, beginning the protectorate relationship.",
    details:
      "The signing of the General Treaty of Peace marked the beginning of British influence in Bahrain's affairs. The treaty was part of Britain's strategy to secure the Gulf trade routes to India and suppress piracy. Under British protection, Bahrain gained security from external threats while maintaining internal autonomy. The British established a political agency in Manama and gradually increased their influence over foreign policy, defense, and major economic decisions. This relationship provided stability but limited Bahrain's sovereignty for 150 years.",
    category: "trade",
    icon: <Ship className="w-6 h-6" />,
  },
  {
    year: 1932,
    title: "Oil Discovery Revolution",
    description: "The first oil well is drilled at Jebel Dukhan, transforming Bahrain's economy forever.",
    details:
      "The discovery of oil at Well No. 1 in Jebel Dukhan by the Bahrain Petroleum Company (BAPCO) revolutionized the kingdom's economy and society. Bahrain became the first Gulf state to discover oil, preceding Saudi Arabia by six years. The oil industry brought modern infrastructure, education, and healthcare systems. Thousands of workers from across the region migrated to Bahrain, creating a cosmopolitan society. Oil revenues funded the development of Manama as a regional financial center and enabled massive investments in education and social services.",
    category: "development",
    icon: <Factory className="w-6 h-6" />,
  },
  {
    year: 1968,
    title: "Educational Renaissance",
    description: "Bahrain establishes the University of Bahrain and expands public education across the kingdom.",
    details:
      "The establishment of the University of Bahrain marked a turning point in the kingdom's educational development. The government launched comprehensive education reforms, making primary and secondary education free and compulsory for all citizens. Technical and vocational training institutes were established to support the growing oil industry. Women's education was particularly emphasized, with Bahrain becoming a regional leader in female literacy and higher education participation. The education system produced a skilled workforce that would drive Bahrain's economic diversification efforts.",
    category: "development",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    year: 1971,
    title: "Independence Achievement",
    description: "Bahrain declares independence from British protection, becoming a fully sovereign nation.",
    details:
      "On August 15, 1971, Bahrain achieved full independence after 150 years of British protection. Sheikh Isa bin Salman Al Khalifa became the first Emir of independent Bahrain. The transition was peaceful and well-planned, with Bahrain immediately joining the Arab League and the United Nations. The new constitution established a parliamentary system with an elected National Assembly. Women gained full political rights, including the right to vote and stand for election. The King also launched Vision 2030, focusing on economic diversification, human development, and sustainable growth.",
    category: "independence",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    year: 1975,
    title: "Financial Hub Development",
    description:
      "Bahrain establishes itself as the financial capital of the Gulf with the creation of offshore banking units.",
    details:
      "The establishment of Offshore Banking Units (OBUs) transformed Bahrain into the financial capital of the Middle East. The Bahrain Monetary Agency (now Central Bank of Bahrain) created a regulatory framework that attracted international banks and financial institutions. Citibank became the first international bank to establish operations, followed by dozens of others. The financial sector grew to employ thousands and contribute significantly to GDP. Bahrain's strategic location, skilled workforce, and business-friendly regulations made it the preferred regional headquarters for multinational corporations.",
    category: "development",
    icon: <Building className="w-6 h-6" />,
  },
  {
    year: 1999,
    title: "King Hamad's Modernization",
    description:
      "King Hamad bin Isa Al Khalifa ascends to power, launching comprehensive political and economic reforms.",
    details:
      "King Hamad's accession marked the beginning of unprecedented political and social reforms in Bahrain. He released political prisoners, allowed exiles to return, and launched the National Action Charter process. The Charter, approved by 98.4% of voters in a referendum, transformed Bahrain into a constitutional monarchy with an elected parliament. Women gained full political rights, including the right to vote and stand for election. The King also launched Vision 2030, focusing on economic diversification, human development, and sustainable growth.",
    category: "modern",
    icon: <Crown className="w-6 h-6" />,
  },
  {
    year: 2002,
    title: "Constitutional Monarchy",
    description: "Bahrain becomes a constitutional monarchy with the establishment of a bicameral parliament.",
    details:
      "The promulgation of the new constitution in 2002 established Bahrain as a constitutional monarchy with a bicameral National Assembly. The Council of Representatives became fully elected, while the Shura Council remained appointed. This marked the return of parliamentary life after a 27-year hiatus. The constitution guaranteed fundamental rights, judicial independence, and the separation of powers. Women participated as voters and candidates for the first time, with Dr. Fawzia Zainal becoming the first female MP in the Gulf. The reforms positioned Bahrain as a pioneer of democratic development in the region.",
    category: "modern",
    icon: <Landmark className="w-6 h-6" />,
  },
  {
    year: 2018,
    title: "Digital Transformation Initiative",
    description: "Bahrain launches comprehensive digital government services and becomes a regional fintech hub.",
    details:
      "Bahrain's digital transformation initiative revolutionized government services and positioned the kingdom as a regional technology leader. The eGovernment program digitized over 90% of government services, making Bahrain one of the most digitally advanced nations globally. The Central Bank of Bahrain created a regulatory sandbox for fintech companies, attracting international startups and established firms. Bahrain became the first country in the MENA region to regulate cryptocurrency and blockchain technology. The initiative included smart city projects, 5G network deployment, and artificial intelligence integration across government services.",
    category: "modern",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    year: 2030,
    title: "Vision 2030 Realization",
    description:
      "Bahrain achieves its ambitious Vision 2030 goals for economic diversification, sustainability, and innovation.",
    details:
      "Vision 2030 represents Bahrain's comprehensive transformation into a sustainable, diversified economy powered by innovation and human capital. The plan focuses on three key pillars: sustainability, competitiveness, and fairness. Major achievements include becoming carbon neutral, establishing Bahrain as the Silicon Valley of the Middle East, and creating a knowledge-based economy. The vision encompasses smart city infrastructure, renewable energy leadership, advanced manufacturing, and world-class tourism destinations. Education and healthcare systems rank among the world's best, while Bahrain maintains its position as the region's financial and business hub.",
    category: "future",
    icon: <Leaf className="w-6 h-6" />,
  },
]

export function BahrainTimeline() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const currentEvent = timelineEvents[currentIndex]
  const isFutureEvent = currentEvent.category === "future"

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= timelineEvents.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const navigateToEvent = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false)
  }

  const nextEvent = () => {
    if (currentIndex < timelineEvents.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevEvent = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ancient":
        return "bg-chart-4 text-chart-4-foreground"
      case "trade":
        return "bg-chart-2 text-chart-2-foreground"
      case "independence":
        return "bg-chart-1 text-chart-1-foreground"
      case "modern":
        return "bg-chart-3 text-chart-3-foreground"
      case "development":
        return "bg-chart-5 text-chart-5-foreground"
      case "future":
        return "bg-accent text-accent-foreground coral-glow"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (showQuiz) {
    return <FutureQuiz onBack={() => setShowQuiz(false)} />
  }

  return (
    <div className="min-h-screen flex flex-col ocean-texture">
      {/* Header */}
      <header className="p-6 text-center border-b border-border bg-card/50 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-primary mb-2 text-balance">Bahrain: Past, Present, Future</h1>
        <p className="text-muted-foreground text-lg text-pretty">
          Journey through time and discover the Kingdom's remarkable story
        </p>
      </header>

      {/* Timeline Slider */}
      <div className="px-6 py-4 border-b border-border bg-card/30 backdrop-blur-sm">
        <TimelineSlider events={timelineEvents} currentIndex={currentIndex} onEventSelect={navigateToEvent} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Event Display */}
        <div className="flex-1 p-6">
          <Card className="h-full ocean-slide bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className={`p-3 rounded-full ${getCategoryColor(currentEvent.category)}`}>{currentEvent.icon}</div>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {currentEvent.year === 3000
                    ? "3000 BCE"
                    : currentEvent.year < 1000
                      ? `${currentEvent.year} CE`
                      : currentEvent.year.toString()}
                </Badge>
              </div>
              <CardTitle className="text-3xl mb-4 text-balance">{currentEvent.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{currentEvent.description}</p>

              <div className="space-y-4">
                <Button onClick={() => setShowDetails(!showDetails)} variant="outline" className="bg-transparent">
                  {showDetails ? "Hide Details" : "Show More Details"}
                </Button>

                {showDetails && (
                  <div className="p-6 bg-muted/50 rounded-lg border text-left">
                    <h4 className="font-semibold text-lg mb-3 text-primary">Historical Context</h4>
                    <p className="text-muted-foreground text-pretty leading-relaxed">{currentEvent.details}</p>
                  </div>
                )}
              </div>

              {isFutureEvent && (
                <div className="space-y-4">
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-accent font-semibold mb-2">🔮 Future Vision</p>
                    <p className="text-sm text-muted-foreground text-pretty">
                      What do you think Bahrain will achieve by 2030? Test your predictions!
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowQuiz(true)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground coral-glow"
                    size="lg"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Take Future Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        <div className="lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-border">
          <div className="space-y-6">
            {/* Playback Controls */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Timeline Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant={isPlaying ? "destructive" : "default"}
                  className="w-full"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {isPlaying ? "Stop Auto-Play" : "Start Auto-Play"}
                </Button>

                <div className="flex gap-2">
                  <Button
                    onClick={prevEvent}
                    disabled={currentIndex === 0}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={nextEvent}
                    disabled={currentIndex === timelineEvents.length - 1}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Indicator */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Journey Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      Event {currentIndex + 1} of {timelineEvents.length}
                    </span>
                    <span>{Math.round(((currentIndex + 1) / timelineEvents.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentIndex + 1) / timelineEvents.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  onClick={() => navigateToEvent(0)}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  🏛️ Ancient Dilmun
                </Button>
                <Button
                  onClick={() => navigateToEvent(6)}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  🛡️ British Protection
                </Button>
                <Button
                  onClick={() => navigateToEvent(9)}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  🇧🇭 Independence
                </Button>
                <Button
                  onClick={() => navigateToEvent(11)}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  👑 Modern Reforms
                </Button>
                <Button
                  onClick={() => navigateToEvent(timelineEvents.length - 1)}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  🚀 Vision 2030
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
