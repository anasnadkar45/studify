import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import PublishModal from '@/app/components/study-plan/PublishModal'
import { StudyPlan } from '@/app/components/study-plan/StudyPlan'
import prisma from '@/app/lib/db'
import { Button } from '@/components/ui/button'

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
  const lastViewedPlan = (await cookieStore).get('lastViewedPlan');

  // Set a cookie for the last viewed plan
  (await cookies()).set('lastViewedPlan', data.title, { httpOnly: true })

  return (
    <div>
      <div className='border-b p-2 px-4'>
        <div className='flex items-center gap-1 place-content-end'>
          {!data.communityId ? <PublishModal studyPlanId={data.id} /> : <Button variant={'outline'}>Unpublish</Button>}
        </div>
      </div>
      {lastViewedPlan && (
        <p className="text-sm text-muted-foreground p-2">
          Last viewed plan: {lastViewedPlan.value}
        </p>
      )}
      <StudyPlan plan={data} />
    </div>
  )
}