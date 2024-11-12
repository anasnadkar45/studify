import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users } from 'lucide-react'
import { format } from 'date-fns'

// Import prisma client
import prisma from '@/app/lib/db'

async function getCommunityStudyPlans() {

  // Fetch data from the database
  const data = await prisma.community.findMany({
    include: {
      studyPlans: {
        include: {
          User: {
            select: {
              email: true,
              id: true,
              firstName: true,
              lastName: true,
              profileImage: true,
            }
          }
        }
      }
    },
    where: {
      studyPlans: {
        some: {}
      }
    }
  })

  return { data }
}

export default async function Page() {
  const { data: communities } = await getCommunityStudyPlans()

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Study Plans</h1>
        <Badge variant="secondary" className="text-sm">
          <Users className="w-4 h-4 mr-2" />
          {communities.length} Communities
        </Badge>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <Card key={community.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-primary/10 pb-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Community {community.id}
              </CardTitle>
              <CardDescription>
                {community.studyPlans.length} study plan(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                {community.studyPlans.slice(0, 3).map((plan) => (
                  <li key={plan.id} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={plan.User?.profileImage || undefined} alt={`${plan.User?.firstName} ${plan.User?.lastName}`} />
                      <AvatarFallback>{plan.User?.firstName?.[0]}{plan.User?.lastName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{plan.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        by {plan.User?.firstName} {plan.User?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created on {format(new Date(plan.createdAt), 'MMMM d, yyyy')}
                      </p>
                    </div>
                    <Link href={`/community/${plan.id}`}>
                      <Button size="sm">View</Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
            {community.studyPlans.length > 3 && (
              <CardFooter className="bg-primary/5 flex justify-center py-2">
                <Button variant="link" size="sm">
                  View all {community.studyPlans.length} plans
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}