import { ToastButton, ToastButton2 } from '@/app/components/global/ToastButton';
import { StudyPlanCard } from '@/app/components/study-plan/StudyPlanCard';
import prisma from '@/app/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Brain, Sparkles } from 'lucide-react';

const getData = async (userId: string) => {
  return await prisma.studyPlan.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      content: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
    take: 3
  });
};

export default async function StudyPlanDashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user.id as string);

  // Get the number of study plans the user has
  const userStudyPlansCount = await prisma.studyPlan.count({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto p-6 space-y-8">
        <header className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Brain className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">AI Study Planner</h1>
          </div>
          <ToastButton userStudyPlansCount={userStudyPlansCount} /> {/* Using the Client Component */}
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span>Your AI-Powered Study Plans</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((plan) => (
                  <StudyPlanCard key={plan.id} plan={plan} />
                ))}
                <ToastButton2 userStudyPlansCount={userStudyPlansCount} /> {/* Using the Client Component */}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
