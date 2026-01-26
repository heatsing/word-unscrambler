"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  TrendingUp,
  Target,
  Clock,
  Calendar,
  Award,
  BarChart3,
  GraduationCap,
  Zap,
  Star,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { useWordLearning, type MasteryLevel, type WordLearning } from "@/hooks/use-word-learning"
import Link from "next/link"

export default function LearningDashboardPage() {
  const {
    learningWords,
    reviewSessions,
    isLoaded,
    getStatistics,
    getDueWords
  } = useWordLearning()

  const [stats, setStats] = useState({
    totalWords: 0,
    newWords: 0,
    learningCount: 0,
    familiarCount: 0,
    masteredCount: 0,
    totalReviews: 0,
    totalSessions: 0,
    totalStudyTime: 0,
  })

  const [dueWords, setDueWords] = useState<WordLearning[]>([])

  useEffect(() => {
    if (isLoaded) {
      setStats(getStatistics())
      setDueWords(getDueWords())
    }
  }, [isLoaded, learningWords, getStatistics, getDueWords])

  // Calculate progress percentage
  const masteryProgress = stats.totalWords > 0
    ? Math.round(((stats.masteredCount + stats.familiarCount) / stats.totalWords) * 100)
    : 0

  // Format study time
  const formatStudyTime = (milliseconds: number) => {
    const totalMinutes = Math.floor(milliseconds / 60000)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  // Calculate daily streak
  const calculateStreak = () => {
    if (reviewSessions.length === 0) return 0

    let streak = 0
    const today = new Date().setHours(0, 0, 0, 0)

    for (let i = 0; i < 30; i++) {
      const checkDate = today - (i * 24 * 60 * 60 * 1000)
      const hasSession = reviewSessions.some(session => {
        const sessionDate = new Date(session.timestamp).setHours(0, 0, 0, 0)
        return sessionDate === checkDate
      })

      if (hasSession) {
        streak++
      } else if (i > 0) {
        // Only break streak if it's not today
        break
      }
    }

    return streak
  }

  const currentStreak = calculateStreak()

  // Mastery level colors
  const masteryColors: Record<MasteryLevel, { bg: string; text: string }> = {
    new: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-300" },
    learning: { bg: "bg-blue-100 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300" },
    familiar: { bg: "bg-yellow-100 dark:bg-yellow-950", text: "text-yellow-700 dark:text-yellow-300" },
    mastered: { bg: "bg-green-100 dark:bg-green-950", text: "text-green-700 dark:text-green-300" },
  }

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Brain className="h-12 w-12 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your learning progress...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-lg">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Learning Dashboard</h1>
              <p className="text-muted-foreground">Track your vocabulary progress and achievements</p>
            </div>
          </div>
        </div>

        {stats.totalWords === 0 ? (
          // Empty State
          <Card className="p-12">
            <div className="text-center space-y-4">
              <Brain className="h-16 w-16 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-bold">Start Your Learning Journey</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven't added any words to your learning list yet. Start by finding words using the
                word unscrambler and add them to your learning list.
              </p>
              <div className="flex gap-4 justify-center mt-6">
                <Link href="/word-unscrambler">
                  <Button size="lg">
                    <Target className="h-4 w-4 mr-2" />
                    Find Words
                  </Button>
                </Link>
                <Link href="/wordle-solver">
                  <Button size="lg" variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Solve Wordle
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {/* Key Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {/* Total Words */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Words
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <div className="text-3xl font-bold">{stats.totalWords}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stats.newWords} new words to learn
                  </p>
                </CardContent>
              </Card>

              {/* Mastery Progress */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Mastery Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <div className="text-3xl font-bold">{masteryProgress}%</div>
                  </div>
                  <Progress value={masteryProgress} className="mt-2" />
                </CardContent>
              </Card>

              {/* Current Streak */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    <div className="text-3xl font-bold">{currentStreak}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {currentStreak > 0 ? "days in a row 🔥" : "Start reviewing today!"}
                  </p>
                </CardContent>
              </Card>

              {/* Total Reviews */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div className="text-3xl font-bold">{stats.totalReviews}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Across {stats.totalSessions} sessions
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Mastery Breakdown & Study Time */}
              <div className="space-y-6 lg:col-span-2">
                {/* Mastery Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Mastery Breakdown
                    </CardTitle>
                    <CardDescription>Distribution of your vocabulary by mastery level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mastered */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Mastered</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {stats.masteredCount} words
                          </span>
                        </div>
                        <Progress
                          value={stats.totalWords > 0 ? (stats.masteredCount / stats.totalWords) * 100 : 0}
                          className="bg-green-100"
                        />
                      </div>

                      {/* Familiar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-yellow-600" />
                            <span className="font-medium">Familiar</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {stats.familiarCount} words
                          </span>
                        </div>
                        <Progress
                          value={stats.totalWords > 0 ? (stats.familiarCount / stats.totalWords) * 100 : 0}
                          className="bg-yellow-100"
                        />
                      </div>

                      {/* Learning */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Learning</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {stats.learningCount} words
                          </span>
                        </div>
                        <Progress
                          value={stats.totalWords > 0 ? (stats.learningCount / stats.totalWords) * 100 : 0}
                          className="bg-blue-100"
                        />
                      </div>

                      {/* New */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">New</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {stats.newWords} words
                          </span>
                        </div>
                        <Progress
                          value={stats.totalWords > 0 ? (stats.newWords / stats.totalWords) * 100 : 0}
                          className="bg-gray-100"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Study Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Time</p>
                        <p className="text-2xl font-bold">{formatStudyTime(stats.totalStudyTime)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Sessions</p>
                        <p className="text-2xl font-bold">{stats.totalSessions}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Avg/Session</p>
                        <p className="text-2xl font-bold">
                          {stats.totalSessions > 0
                            ? formatStudyTime(stats.totalStudyTime / stats.totalSessions)
                            : "0m"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Due for Review */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Due for Review
                    </CardTitle>
                    <CardDescription>
                      {dueWords.length === 0 ? "All caught up!" : `${dueWords.length} words need review`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {dueWords.length === 0 ? (
                      <div className="text-center py-8">
                        <Award className="h-12 w-12 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Great job! No words due for review.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {dueWords.slice(0, 10).map((word) => (
                          <div
                            key={word.word}
                            className={`p-2 rounded-lg ${masteryColors[word.masteryLevel].bg}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`font-medium ${masteryColors[word.masteryLevel].text}`}>
                                {word.word}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {word.reviewCount} reviews
                              </Badge>
                            </div>
                          </div>
                        ))}
                        {dueWords.length > 10 && (
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            +{dueWords.length - 10} more words
                          </p>
                        )}
                        <Link href="/word-unscrambler">
                          <Button className="w-full mt-4">
                            Start Reviewing
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
