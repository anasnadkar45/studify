"use client"

import { DeleteStudyPlanAction } from '@/app/action'
import { deleteStudyPlanSchema } from '@/app/lib/zodSchemas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import Link from 'next/link'
import { SubmitButton } from '../global/SubmitButton'
import { useActionState, useState } from 'react'
import { BookOpen, MoreVertical, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PlanData {
  id: string
  title: string
}

interface PlanProps {
  plan: PlanData
}

export const StudyPlanCard = ({ plan }: PlanProps) => {
  const [state, formAction] = useActionState(DeleteStudyPlanAction, null)
  const [form, fields] = useForm({
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: deleteStudyPlanSchema })
    },
    shouldValidate: "onSubmit",
  })


  return (
    <Card key={plan.id} className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-col space-y-1.5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-primary">{plan.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={(event) => {
                event.preventDefault()
                const formEl = document.getElementById(form.id) as HTMLFormElement
                formEl.requestSubmit()
              }}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="pt-4 bg-zinc-800/50 rounded-b-lg">
        <Link href={`/study-plan/${plan.id}`} className="w-full">
          <Button className="w-full" size="lg">
            <BookOpen className="mr-2 h-5 w-5" />
            View Study Plan
          </Button>
        </Link>
      </CardFooter>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={formAction}
        className="hidden"
      >
        <input
          type="hidden"
          name="studyPlanId"
          value={plan.id}
        />
        <SubmitButton 
          text="Delete"
          variant="ghost"
          className="hidden"
        />
      </form>
    </Card>
  )
}