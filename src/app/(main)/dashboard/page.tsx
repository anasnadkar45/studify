import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { Clock, BookOpen, ArrowRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import prisma from '@/app/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { StudyPlanCard } from '@/app/components/study-plan/StudyPlanCard'
import { ToastButton3 } from '@/app/components/global/ToastButton'

async function getStudyPlans(userId: string) {
  const data = await prisma.studyPlan.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      content: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
    take: 3
  })
  return data
}

async function getRecentActivity(userId: string) {
  const data = await prisma.studyPlan.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })
  return data
}

export default async function StudyPlanDashboard() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) {
    return <div className="container mx-auto p-4">Please log in to view your study plans.</div>
  }

  const cookieStore = cookies()
  const theme = (await cookieStore).get('theme')

  const studyPlans = await getStudyPlans(user.id)
  const recentActivity = await getRecentActivity(user.id)
  const userStudyPlansCount = await prisma.studyPlan.count({
    where: {
      userId: user.id,
    },
  })

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Study Plans</h1>
          <p className="text-muted-foreground">Manage and track your learning progress</p>
        </div>
        <Avatar>
          <AvatarImage src={user.picture ?? ''} alt={user.given_name ?? ''} />
          <AvatarFallback>{user.given_name?.[0] ?? 'U'}</AvatarFallback>
        </Avatar>
      </header>

      {theme && <p className="text-sm text-muted-foreground">Current theme: {theme.value}</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ToastButton3 userStudyPlansCount={userStudyPlansCount} />

        {studyPlans.map((plan) => (
          <StudyPlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p>{activity.title} study plan</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(activity.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex justify-end mt-8">
        <Link href="/study-plan">
          <Button variant="link" className="text-muted-foreground">
            View All Study Plans <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}