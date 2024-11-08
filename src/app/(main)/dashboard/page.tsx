'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, Clock, BookOpen, ArrowRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'

// Mocked data for demonstration
const studyPlans = [
  { id: '1', title: 'Mathematics', content: 'Algebra, Geometry, Calculus', progress: 65 },
  { id: '2', title: 'Physics', content: 'Mechanics, Thermodynamics, Optics', progress: 40 },
  { id: '3', title: 'Computer Science', content: 'Algorithms, Data Structures, Web Development', progress: 80 },
  { id: '4', title: 'Literature', content: 'Shakespeare, Modern Poetry, Novel Analysis', progress: 25 },
]

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  image: '/placeholder.svg'
}

export default function StudyPlanDashboard() {
  const router = useRouter()

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Study Plans</h1>
          <p className="text-muted-foreground">Manage and track your learning progress</p>
        </div>
        {/* <Avatar>
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar> */}
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full bg-card text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Study Plan</CardTitle>
            <CardDescription className="text-purple-100">Start your learning journey today</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Organize your study materials, set goals, and track your progress with our intuitive study planner.</p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="secondary" 
              className="w-full mt-4"
              onClick={() => router.push('/study-plan/create')}
            >
              <Plus className="mr-2 h-4 w-4" /> Create StudyPlan
            </Button>
          </CardFooter>
        </Card>

        {studyPlans.map((plan) => (
          <Card key={plan.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.content}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>Last updated 2 days ago</span>
              </div>
              <Progress value={plan.progress} className="w-full" />
              <p className="text-sm text-right mt-1">{plan.progress}% Complete</p>
            </CardContent>
            <CardFooter>
              <Button  
                className="w-full"
                onClick={() => router.push(`/study-plan/${plan.id}`)}
              >
                <BookOpen className="mr-2 h-4 w-4" /> View Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p>Updated {['Mathematics', 'Physics', 'Computer Science', 'Literature'][i % 4]} study plan</p>
              </div>
              <span className="text-sm text-muted-foreground">{i + 1}h ago</span>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex justify-end mt-8">
        <Button variant="link" className="text-muted-foreground">
          View All Study Plans <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}