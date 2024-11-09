"use client"

import React, { useState, useEffect, useMemo } from "react"
import { BookOpen, Brain, ChevronDown, ChevronUp, Clock, ExternalLink, Search, SortAsc, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

interface Plan {
  id: string
  title: string
  content: string
}

interface StudyPlanData {
  summary: string
  studyPlan: {
    dailySessions: {
      day: number
      topics: string[]
      duration: string
      quiz?: {
        questions: {
          question: string
          answer: string
        }[]
      }
      resources?: {
        topic: string
        website: string
        description: string
      }[]
    }[]
  }
  questions: {
    type: string
    question: string
    options?: string[]
    details: string
  }[]
}

interface StudyPlanProps {
  plan: Plan
}

export const CommunityStudyPlan = ({ plan }:StudyPlanProps) => {
  const [studyPlan, setStudyPlan] = useState<StudyPlanData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterType, setFilterType] = useState<string>("all")
  const [completedDays, setCompletedDays] = useState<number[]>([])
  console.log(completedDays)

  useEffect(() => {
    const rawContent = plan.content
    setStudyPlan(rawContent)
  }, [plan.content])

  const filteredAndSortedSessions = useMemo(() => {
    if (!studyPlan) return []

    return studyPlan.studyPlan.dailySessions
      .filter((session) =>
        session.topics.some((topic) =>
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.day - b.day
        } else {
          return b.day - a.day
        }
      })
  }, [studyPlan, searchTerm, sortOrder])

  const filteredAndSortedQuestions = useMemo(() => {
    if (!studyPlan) return []

    return studyPlan.questions
      .filter((question) => {
        if (filterType === "all") return true
        return question.type.toLowerCase() === filterType.toLowerCase()
      })
      .filter((question) =>
        question.question.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.question.localeCompare(b.question)
        } else {
          return b.question.localeCompare(a.question)
        }
      })
  }, [studyPlan, searchTerm, sortOrder, filterType]);

  const toggleDayCompletion = (day: number) => {
    setCompletedDays((prevCompletedDays) => {
      if (prevCompletedDays.includes(day)) {
        return prevCompletedDays.filter((d) => d !== day)
      } else {
        return [...prevCompletedDays, day]
      }
    })
  }

  const progressPercentage = useMemo(() => {
    if (!studyPlan) return 0
    const totalDays = studyPlan.studyPlan.dailySessions.length
    return Math.round((completedDays.length / totalDays) * 100)
  }, [studyPlan, completedDays])

  if (!studyPlan) {
    return <div className="text-center p-8">Loading study plan...</div>
  }

  if (!studyPlan) {
    return <div className="text-center p-8">Loading study plan...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">{plan.title}</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Study Plan Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-center mt-2">{progressPercentage}% Complete</p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Study Plan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{studyPlan.summary}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="daily-plan" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 bg-transparent border-2">
          <TabsTrigger value="daily-plan">Daily Study Plan</TabsTrigger>
          <TabsTrigger value="exam-questions">Exam Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="daily-plan">
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-full sm:w-auto"
            >
              {sortOrder === "asc" ? <SortAsc className="mr-2" /> : <SortDesc className="mr-2" />}
              Sort by Day
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {filteredAndSortedSessions.map((session, index) => (
              <AccordionItem key={index} value={`day-${session.day}`}>
                <AccordionTrigger className="text-xl font-semibold">
                  <div className="flex items-center justify-between w-full">
                    <span>Day {session.day}</span>
                    <Button
                      variant={completedDays.includes(session.day) ? "default" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleDayCompletion(session.day)
                      }}
                    >
                      {completedDays.includes(session.day) ? "Completed" : "Mark as Complete"}
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="font-medium">Topics:</span>
                      {session.topics && session.topics.map((topic, i) => (
                        <Badge key={i} className="bg-orange-400">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Duration:</span>
                      <span>{session.duration}</span>
                    </div>

                    {session.resources && session.resources.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">Resources</h4>
                        {session.resources.map((resource, i) => (
                          <Card key={i}>
                            <CardContent className="p-4">
                              <h5 className="font-semibold">{resource.topic}</h5>
                              <a
                                href={resource.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center"
                              >
                                {resource.website}
                                <ExternalLink className="ml-1 h-4 w-4" />
                              </a>
                              <p className="text-muted-foreground mt-2">{resource.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {session.quiz && (
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold flex items-center">
                          <Brain className="h-5 w-5 text-primary mr-2" />
                          Quiz Questions
                        </h4>
                        {session.quiz.questions && session.quiz.questions.map((quiz, i) => (
                          <Card key={i}>
                            <CardContent className="p-4">
                              <h5 className="font-semibold">{quiz.question}</h5>
                              <p className="text-muted-foreground mt-2">{quiz.answer}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="exam-questions">
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="multiple choice">Multiple Choice</SelectItem>
                <SelectItem value="short answer">Short Answer</SelectItem>
                <SelectItem value="fill-in-the-blanks">Fill in the Blanks</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-full sm:w-auto"
            >
              {sortOrder === "asc" ? <SortAsc className="mr-2" /> : <SortDesc className="mr-2" />}
              Sort
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAndSortedQuestions.map((question, index) => (
              <Card key={index} className="col-span-1">
                <CardHeader className="bg-muted rounded-t-lg p-2 mb-4">
                  <CardTitle className="text-xl font-semibold">
                    {question.type} Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-2">{question.question}</p>
                  {question.options && (
                    <ul className="list-disc list-inside mb-2">
                      {question.options.map((option, i) => (
                        <li key={i} className="text-muted-foreground">{option}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-muted-foreground">Answer: {question.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}