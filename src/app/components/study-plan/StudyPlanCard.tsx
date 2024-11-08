"use client"
import { DeleteStudyPlanAction } from '@/app/action'
import { deleteStudyPlanSchema } from '@/app/lib/zodSchemas'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import Link from 'next/link'
import { SubmitButton } from '../global/SubmitButton'
import { useActionState } from 'react'

interface planData {
    id: string,
    title: string,
}

interface planProps {
    plan: planData
}

export const StudyPlanCard = ({ plan }: planProps) => {
    const [state, formAction] = useActionState(DeleteStudyPlanAction, null)
    const [form, fields] = useForm({
        lastResult: state,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: deleteStudyPlanSchema })
        },
        shouldValidate: "onSubmit",
    })

    return (
        <Card key={plan.id} className="flex flex-col">
            <CardHeader className='flex justify-between items-center'>
                <CardTitle className="text-xl font-semibold">
                    {plan.title}
                </CardTitle>
                <form
                    id={form.id}
                    onSubmit={form.onSubmit}
                    action={formAction}
                >
                    <input
                        type="hidden"
                        name="studyPlanId"
                        value={plan.id}
                    />
                    <SubmitButton 
                        text="Delete" 
                        variant="destructive"
                    />
                </form>
            </CardHeader>
            <CardFooter className="mt-auto">
                <Link href={`/study-plan/${plan.id}`} className="w-full">
                    <Button className="w-full">View Study Plan</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}