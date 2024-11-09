'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Cloud } from "lucide-react"
import { useActionState, useState } from "react"
import { toast } from "sonner"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { publishStudyPlanSchema } from "@/app/lib/zodSchemas"
import { publishStudyPlan } from "@/app/action"

interface PublishModalProps {
    studyPlanId: string
    className?: string
}

export default function PublishModal({ studyPlanId, className }: PublishModalProps) {
    const [isPublishing, setIsPublishing] = useState(false)
    const [open, setOpen] = useState(false)

    const [lastResult, action] = useActionState(publishStudyPlan, undefined)
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: publishStudyPlanSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsPublishing(true)

        try {
            const formData = new FormData(event.currentTarget)
            formData.append('studyPlanId', studyPlanId)

            const result = await action(formData)

            if (result?.status === "success") {
                toast.success("Your study plan has been published to the community.", {
                    description: "Others can now view and save it.",
                    duration: 5000,
                })
                setOpen(false)
            } else if (result?.error) {
                toast.error("Failed to publish study plan.", {
                    description: result.error.general?.[0] || "An unexpected error occurred.",
                    duration: 5000,
                })
            }
        } finally {
            setIsPublishing(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={cn("gap-2", className)}>
                    <Cloud className="h-5 w-5" />
                    Publish
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Publish Study Plan</DialogTitle>
                    <DialogDescription>
                        Share your study plan with the community
                    </DialogDescription>
                </DialogHeader>
                <form
                    id={form.id}
                    onSubmit={handleSubmit}
                    action={action}
                    noValidate
                    className="flex flex-col items-center justify-center space-y-4 py-5"
                >
                    <Button
                        type="submit"
                        disabled={isPublishing}
                        className="w-full max-w-xs gap-2"
                    >
                        {isPublishing ? (
                            "Publishing..."
                        ) : (
                            <>
                                <Cloud className="h-5 w-5" />
                                Publish to Community
                            </>
                        )}
                    </Button>
                    <DialogDescription className="text-center text-sm text-muted-foreground">
                        This will publish the study plan to the community, making it accessible for others to view and save.
                    </DialogDescription>
                </form>
            </DialogContent>
        </Dialog>
    )
}