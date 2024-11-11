import { cookies } from 'next/headers'
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

  const cookieStore = cookies()
  const lastViewedCommunityPlan = (await cookieStore).get('lastViewedCommunityPlan')

  // Set a cookie for the last viewed community plan
  ;(await cookies()).set('lastViewedCommunityPlan', data.title, { httpOnly: true })

  return (
    <div className="container mx-auto p-4">
      {lastViewedCommunityPlan && (
        <p className="text-sm text-muted-foreground mb-4">
          Last viewed community plan: {lastViewedCommunityPlan.value}
        </p>
      )}
      <CommunityStudyPlan plan={data} />
    </div>
  )
}