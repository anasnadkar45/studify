import { notFound } from 'next/navigation'
import { CommunityStudyPlan } from '@/app/components/community/CommunityStudyPlan'
import prisma from '@/app/lib/db'

async function getData(id: string) {
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
  })

  if (!data) {
    notFound()
  }

  return data
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id)

  return (
    <div className="container mx-auto p-4">
      <CommunityStudyPlan plan={data} />
    </div>
  )
}