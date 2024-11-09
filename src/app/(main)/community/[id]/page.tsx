import { CommunityStudyPlan } from '@/app/components/community/CommunityStudyPlan';
import prisma from '@/app/lib/db';
import React from 'react';

const getData = async (id: string) => {
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
            <CommunityStudyPlan plan={data} />
        </div>
    );
};

export default page;