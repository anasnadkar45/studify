import { StudyPlanCard } from '@/app/components/study-plan/StudyPlanCard';
import prisma from '@/app/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const getData = async (userId: string) => {
  const data = await prisma.studyPlan.findMany({
    where: {
      userId: userId
    },
    select: {
      id: true,
      title: true,
      content: true
    }
  });

  return data;
};

const page = async () => {
  const {getUser} = getKindeServerSession();
  const user = await getUser()
  const data = await getData(user.id as string);

  return (
    <div className='p-4 space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl'>Study Plan</h1>
        <Link href={'/study-plan/create'}>
          <Button className='space-x-2'><span>Create StudyPlan</span> <Sparkles /></Button>
        </Link>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {data.map((plan) => (
          <StudyPlanCard key={plan.id} plan={plan}/>
        ))}
      </div>
    </div>
  );
};

export default page;