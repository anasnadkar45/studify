import PublishModal from '@/app/components/study-plan/PublishModal';
import { StudyPlan } from '@/app/components/study-plan/StudyPlan';
import prisma from '@/app/lib/db';
import { Button } from '@/components/ui/button';
import React from 'react';
import { unstable_noStore as noStore } from 'next/cache'

const getData = async (id: string) => {
    noStore
    const data = await prisma.studyPlan.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            content: true,
            communityId: true
        }
    });

    return data;
};

const page = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const id = (await params).id
    const data = await getData(id);

    if (!data) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <p className="text-lg text-muted-foreground">Study plan not found.</p>
            </div>
        );
    }

    return (
        <div>
            <div className='border-b p-2 px-4'>
                <div className='flex items-center gap-1 place-content-end'>
                    {!data.communityId ? <PublishModal studyPlanId={data.id} /> : <Button variant={'outline'}>Unpublish</Button>}
                </div>
            </div>
            <StudyPlan plan={data} />
        </div>
    );
};

export default page;