"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, Trophy, Lightbulb } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: "smart-cities" | "renewable-energy" | "tourism" | "economy"
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "By 2030, what percentage of Bahrain's energy is targeted to come from renewable sources?",
    options: ["5%", "10%", "20%", "30%"],
    correctAnswer: 1,
    explanation:
      "Bahrain aims to generate 10% of its energy from renewable sources by 2030 as part of its sustainability vision.",
    category: "renewable-energy",
  },
  {
    id: 2,
    question: "Which smart city technology is Bahrain prioritizing for urban development?",
    options: ["Flying cars", "IoT sensors and 5G networks", "Underground tunnels", "Floating buildings"],
    correctAnswer: 1,
    explanation:
      "Bahrain is investing heavily in IoT sensors and 5G infrastructure to create smart, connected urban environments.",
    category: "smart-cities",
  },
  {
    id: 3,
    question: "What is Bahrain's tourism target for annual visitors by 2030?",
    options: ["5 million", "8 million", "12 million", "15 million"],
    correctAnswer: 2,
    explanation:
      "Bahrain aims to attract 12 million tourists annually by 2030 through cultural heritage and modern attractions.",
    category: "tourism",
  },
  {
    id: 4,
    question: "Which sector is Bahrain focusing on to diversify its economy beyond oil?",
    options: ["Agriculture only", "Financial services and fintech", "Mining", "Fishing industry"],
    correctAnswer: 1,
    explanation: "Bahrain is positioning itself as a regional fintech hub and expanding its financial services sector.",
    category: "economy",
  },
]

interface FutureQuizProps {
  onBack: () => void
}

export function FutureQuiz({ onBack }: FutureQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const question = quizQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === quizQuestions.length - 1

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1)
    }

    if (isLastQuestion) {
      setShowResult(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "smart-cities":
        return "🏙️"
      case "renewable-energy":
        return "🌱"
      case "tourism":
        return "🏛️"
      case "economy":
        return "💰"
      default:
        return "🔮"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "smart-cities":
        return "bg-chart-1 text-chart-1-foreground"
      case "renewable-energy":
        return "bg-chart-2 text-chart-2-foreground"
      case "tourism":
        return "bg-chart-3 text-chart-3-foreground"
      case "economy":
        return "bg-chart-4 text-chart-4-foreground"
      default:
        return "bg-accent text-accent-foreground"
    }
  }

  if (showResult) {
    const percentage = Math.round((score / quizQuestions.length) * 100)

    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-accent rounded-full pulse-glow">
                <Trophy className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
            <p className="text-muted-foreground">Your knowledge of Bahrain's future vision</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
              <p className="text-lg text-muted-foreground">
                You scored {score} out of {quizQuestions.length} questions correctly
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Results:</h3>
              {quizQuestions.map((q, index) => (
                <div key={q.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex-shrink-0">
                    {answers[index] === q.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{q.question}</p>
                    <p className="text-xs text-muted-foreground mt-1">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Timeline
              </Button>
              <Button onClick={resetQuiz} className="flex-1">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Button onClick={onBack} variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-full ${getCategoryColor(question.category)}`}>
              <span className="text-lg">{getCategoryIcon(question.category)}</span>
            </div>
            <div>
              <CardTitle className="text-xl text-balance">{question.question}</CardTitle>
              <p className="text-sm text-muted-foreground capitalize">
                {question.category.replace("-", " ")} • Bahrain Vision 2030
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4 text-wrap"
                size="lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
                    ${
                      selectedAnswer === index
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-muted-foreground"
                    }
                  `}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-pretty">{option}</span>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-2">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index < currentQuestion ? "bg-primary" : index === currentQuestion ? "bg-accent" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
              <Lightbulb className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
